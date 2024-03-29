use SmarterLands;
go

create view VW_GetAllCrops as
select * from crops;
go

create view VW_GetAllBins as
select * from bins;
go

create view VW_GetCropsOnBin as
select bc.id, bin_id, crop_id, quantity, [name], 
photo, [description], optimal_moisture, optimal_temperature
from bin_crop bc 
join crops c on bc.crop_id = c.id
go

create view VW_GetNotifications as
select * from notifications 
go

create view VW_GetSensorReadings as
select * from sensor_readings 
go

create view VW_GetNotificationsLimit as
select top 4 * from notifications 
go

create view VW_GetSensorReadingsLimit as
select top 4 * from sensor_readings 
go

--create view VW_GetSensorReading as
--select sr.id as sensor_id, time, temperature, humidity, moisture,
--precipitation, bin_id, notification_id, [message], [type] from sensor_readings sr 
--join notifications n on n.id = sr.notification_id
--go