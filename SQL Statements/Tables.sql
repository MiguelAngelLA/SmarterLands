create database SmarterLands
go

use SmarterLands;
go

--EXEC sp_msforeachtable 'ALTER TABLE ? NOCHECK CONSTRAINT all'
--EXEC sp_msforeachtable 'DROP TABLE ?'

create table crops (
	[id] int primary key identity(1000, 1),
	[name] varchar(50) not null,
	[photo] varchar(255) default 'no-photo.png',
	[description] varchar(512),
	[optimal_moisture] float not null,
	[optimal_temperature] float default -1.0
)
go

create table bins (
	[id] int primary key identity(1000, 1),
	[name] varchar(50) not null,
	[description] varchar (512),
	[date_created] datetime default current_timestamp not null,
	[width_dimension] int not null,
	[height_dimension] int not null,
	[total_capacity] int not null,
	[remaining_capacity] int not null
)
go

create table bin_crop (
	[id] int primary key identity(1000, 1),
	[quantity] int not null,
	[bin_id] int,
	[crop_id] int,
	foreign key ([bin_id]) REFERENCES bins([id]),
	foreign key ([crop_id]) REFERENCES crops([id]),
)
go

create table notifications (
	[id] int primary key identity(1000, 1),
	[message] text not null,
	[type] tinyint not null,
	[time] datetime not null,
	[bin_id] int,
	foreign key ([bin_id]) REFERENCES bins([id]),
)
go

create table sensor_readings(
	[id] int primary key identity(1000, 1),
	[time] datetime not null,
	[temperature] float not null,
	[humidity] float not null, 
	[moisture] float not null,
	[precipitation] int,
	[bin_id] int,
	[notification_id] int
	foreign key ([bin_id]) REFERENCES bins([id]),
	foreign key ([notification_id]) REFERENCES notifications([id]),
)
go