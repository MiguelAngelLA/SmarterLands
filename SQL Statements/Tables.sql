create database SmarterLands

use SmarterLands;

create table crops (
	[id] int primary key identity(1000, 1),
	[name] varchar(50) not null,
	[photo] varchar(255) not null,
	[description] varchar (512),
	[optimal_moisture] float not null,
	[optimal_temperature] float
)

create table bins (
	[id] int primary key identity(1000, 1),
	[name] varchar(50) not null,
	[description] varchar (512),
	[date_created] datetime default current_timestamp not null,
	[width_dimension] int not null,
	[height_dimension] int not null,
	[crop_capacity] int not null
)

create table bin_crop (
	[id] int primary key identity(1000, 1),
	[bin_id] int,
	[crop_id] int,
	foreign key ([bin_id]) REFERENCES bins([id]),
	foreign key ([crop_id]) REFERENCES crops([id]),
)

create table notifications (
	[id] int primary key identity(1000, 1),
	message text,
	type tinyint,
)

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