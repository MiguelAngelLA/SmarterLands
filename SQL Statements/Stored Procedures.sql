use SmarterLands;
go

create procedure SP_PostCrop 
-- parameters
	@name varchar(50),
	@description varchar(512),
	@photo varchar(255) = null,
	@optimal_moisture float,
	@optimal_temperature float = null,
	@status int output
as
begin
-- variables
	declare @photoNull varchar(255);

-- validate
	set @status = 0; -- no error
	if (@optimal_moisture <0 or @optimal_moisture > 100) set @status = 3
	if @status = 0 begin	
		--transaction
		begin transaction
			--try
			begin try
				if @photo is null
					set @photoNull = 'no-photo.png'
				else
					set @photoNull = @photo

				insert into crops values(@name, @photoNull, @description, @optimal_moisture, @optimal_temperature);

				commit transaction;
			end try
			begin catch
				rollback transaction;
				set @status = 255;
			end catch; 
		select @status;
	end;
end;
go

create procedure SP_PutCrop 
-- parameters
	@id int,
	@name varchar(50),
	@description varchar(512),
	@photo varchar(255) = null,
	@optimal_moisture float,
	@optimal_temperature float = null,
	@status int output
as
begin
-- variables
	declare @photoNull varchar(255);

-- validate
	set @status = 0; -- no error
	if not exists (select * from crops where id = @id) set @status = 1 -- Crop does not exist
	if @status = 0 begin	
		--transaction
		begin transaction
			--try
			begin try
				if @photo is null
					set @photoNull = 'no-photo.png'
				else
					set @photoNull = @photo

				update crops set name = @name, photo = @photoNull, 
				description = @description, optimal_moisture = @optimal_moisture, 
				optimal_temperature = @optimal_temperature where id = @id;

				commit transaction;
			end try
			begin catch
				rollback transaction;
				set @status = 255;
			end catch; 
		select @status;
	end;
end;
go

create procedure SP_DelCrop 
	@id int,
	@status int output
as
begin
-- validate
	set @status = 0; -- no error
	if not exists (select * from crops where id = @id) set @status = 1 -- Crop does not exist
	if exists (select * from bin_crop where crop_id = @id) set @status = 2 -- Crop is in a bin :(
	if @status = 0 begin	
		--transaction
		begin transaction
			--try
			begin try
					delete from crops where id = @id;
				commit transaction;
			end try
			begin catch
				rollback transaction;
				set @status = 255;
			end catch; 
		select @status;
	end;
end;
go

create procedure SP_PostBin 
-- parameters
	@name varchar(50),
	@description varchar(512),
	@width int,
	@height int,
	@status int output
as
begin
-- validate
	set @status = 0; -- no error
	if (@width < 0 or @width > 10000 or @height < 0 or @height > 10000) set @status = 4
	if @status = 0 begin	
		--transaction
		begin transaction
			--try
			begin try

				insert into bins values(@name, @description, default, @width, @height, (@width * @height), 
				(@width * @height));

				commit transaction;
			end try
			begin catch
				rollback transaction;
				set @status = 255;
			end catch; 
		select @status;
	end;
end;
go

create procedure SP_PutBin 
-- parameters
	@id int,
	@name varchar(50),
	@description varchar(512),
	@width int,
	@height int,
	@status int output
as
begin
-- validate
	set @status = 0; -- no error
	if (@width <= 0 or @width > 50 or @height <= 0 or @height > 50) set @status = 4
	if ((@width * @height) < ((select [total_capacity] from bins where id = @id) -
	(select [remaining_capacity] from bins where id = @id))) set @status = 5
	if @status = 0 begin	
		--transaction
		begin transaction
			--try
			begin try

				update bins set name = @name, description = @description, width_dimension = @width, 
				height_dimension = @height, [total_capacity] = (@width * @height),
				[remaining_capacity] = ((@width * @height) - ([total_capacity] - [remaining_capacity]))  where id = @id

				commit transaction;
			end try
			begin catch
				rollback transaction;
				set @status = 255;
			end catch; 
		select @status;
	end;
end;
go

create procedure SP_DelBin
	@id int,
	@status int output
as
begin
-- validate
	set @status = 0; -- no error
	if not exists (select * from bins where id = @id) set @status = 1 -- Bin does not exist
	if exists (select * from bin_crop where bin_id = @id) set @status = 2 -- Bin has crops :(
	if exists (select * from sensor_readings where bin_id = @id) set @status = 6 -- Bin has sensor readings
	if @status = 0 begin	
		--transaction
		begin transaction
			--try
			begin try
					delete from crops where id = @id;
				commit transaction;
			end try
			begin catch
				rollback transaction;
				set @status = 255;
			end catch; 
		select @status;
	end;
end;
go

create procedure SP_BinAddCrop
-- parameters
	@bin_id int,
	@crop_id int,
	@quantity int,
	@status int output
as
begin
-- validate
	set @status = 0; -- no error
	if not exists (select * from bins where id = @bin_id) set @status = 1 -- Bin does not exist
	if (@quantity > (select [remaining_capacity] from bins where id = @bin_id)) set @status = 3 -- Quantity exceeds capacity
	if not exists (select * from crops where id = @crop_id) set @status = 7 -- Crop does not exist
	if @status = 0 begin	
		--transaction
		begin transaction
			--try
			begin try

				if exists(select * from bin_crop where crop_id = @crop_id and bin_id = @bin_id) begin
				update bin_crop set quantity = (quantity + @quantity) where crop_id = @crop_id and bin_id = @bin_id
				end
				else
				begin
				insert into bin_crop values(@quantity, @bin_id, @crop_id)
				end
				update bins set remaining_capacity = (remaining_capacity - @quantity) where id = @bin_id

				commit transaction;
			end try
			begin catch
				rollback transaction;
				set @status = 255;
			end catch; 
		select @status;
	end;
end;
go

create procedure SP_BinRemoveCrop
-- parameters
	@bin_id int,
	@crop_id int,
	@quantity int,
	@status int output
as
begin
-- validate
	set @status = 0; -- no error	
	if (@quantity > (select quantity from bin_crop where crop_id = @crop_id and bin_id = @bin_id)) set @status = 8 -- Quantity exceeds crops available
	if not exists (select * from bin_crop where crop_id = @crop_id and bin_id = @bin_id ) set @status = 9 -- Crop Not On Bin
	if not exists (select * from bins where id = @bin_id) set @status = 1 -- Bin does not exist
	if not exists (select * from crops where id = @crop_id) set @status = 7 -- Crop does not exist
	if @status = 0 begin	
		--transaction
		begin transaction
			--try
			begin try

				if (@quantity = (select quantity from bin_crop where crop_id = @crop_id and bin_id = @bin_id)) begin
				delete from bin_crop where crop_id = @crop_id and bin_id = @bin_id
				end
				else
				begin
				update bin_crop set quantity = quantity - @quantity where crop_id = @crop_id and bin_id = @bin_id
				end
				update bins set remaining_capacity = (remaining_capacity + @quantity) where id = @bin_id

				commit transaction;
			end try
			begin catch
				rollback transaction;
				set @status = 255;
			end catch; 
		select @status;
	end;
end;
go