use SmarterLands;
go

create procedure SP_PostCrop 
-- parameters
	@name varchar(50),
	@description varchar(512),
	@photo varchar(255) = '',
	@optimal_moisture float,
	@optimal_temperature float,
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
				if @photo = '' 
				set @photoNull = 'no-photo.png'
				else
				set @photoNull = @photo

				insert into crops values(@name, @description, @photoNull, @optimal_moisture, @optimal_temperature);

				commit transaction;
			end try
			begin catch
				rollback transaction;
				set @status = 999;
			end catch; 
		
		select @status;
	end;
	
end;
