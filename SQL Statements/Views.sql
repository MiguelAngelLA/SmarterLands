use SmarterLands;
go

create view VW_GetAllCrops as
select * from crops;
go

create view VW_GetAllBins as
select * from bins;
go

create view VW_GetCropsOnBin as
select bc.id, quantity, bin_id, crop_id, [name], 
photo, [description], optimal_moisture, optimal_temperature
from bin_crop bc 
join crops c on bc.crop_id = c.id
go

select * from VW_GetCropsOnBin where bin_id = 1001