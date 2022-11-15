use SmarterLands;
go

create view VW_GetAllCrops as
select * from crops;
go

create view VW_GetAllBins as
select * from bins;
go