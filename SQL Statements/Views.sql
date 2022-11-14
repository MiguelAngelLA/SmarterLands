use SmarterLands;
go

create view VW_GetAllCrops as
select * from crops;
go

alter view VW_GetAllBins as
select * from bins;
go

select * from bin_crop
select * from bins
truncate table bin_crop
truncate table bins
insert into bin_crop values (5, 1000, 1000)
