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
-- variables
	declare @photoNull varchar(255);

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