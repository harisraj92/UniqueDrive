//cID,cCode,cName,cAddress,cLocation,cState,cCity,cPincode,cEmail,cNOP,cActive

CREATE TABLE company_master(
    id INT AUTO_INCREMENT PRIMARY KEY,
  	cId int  not null,
    cCode VARCHAR(255) NOT NULL,
  	cName VARCHAR(255) NOT NULL,
  	cAddress VARCHAR(255) NOT NULL,
  	cLocation VARCHAR(255) NOT NULL,
  	cState VARCHAR(255) NOT NULL,
  	cCity VARCHAR(255) NOT NULL,
  	cPincode int,
    cEmail VARCHAR(255)  NULL,
  	cNOP VARCHAR(255)  NULL,
  	cActive int NULL
  	
);

CREATE TABLE departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  d_id INT not null,
  d_name VARCHAR(255) NOT NULL
);


CREATE TABLE cities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  city_code int NOT NULL,
  city_name VARCHAR(255) NOT NULL
);



//rto_name,rto_address,rto_phoneno,serial_no,city_code

CREATE TABLE rto_master (
  id INT AUTO_INCREMENT PRIMARY KEY,
  rto_name VARCHAR(255) NOT NULL,
  rto_address VARCHAR(255) NOT NULL,
  rto_phoneno int(10),
  serial_no VARCHAR(10) NOT NULL,
  city_code int,
  FOREIGN KEY (city_code) REFERENCES cities(city_code)
);


CREATE TABLE designation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  designation_id INT not null,
  designation_name VARCHAR(255) NOT NULL
);



CREATE TABLE MainMenu (
  id INT AUTO_INCREMENT PRIMARY KEY,
  MainMenuId INT NOT NULL UNIQUE,
  MainMenu VARCHAR(255) NOT NULL,
  DisplayName VARCHAR(255),
  OrderBy INT NOT NULL,
  Status BOOLEAN,
  HavingSubMenu BOOLEAN
);



CREATE TABLE SubMenu (
  id INT AUTO_INCREMENT PRIMARY KEY,
  SubMenu VARCHAR(255) NOT NULL,
  DisplayName VARCHAR(255),
  OrderBy INT NOT NULL,
  Status BOOLEAN,
  HavingSubMenu BOOLEAN,
  MainMenuId INT,
  FOREIGN KEY (MainMenuId) REFERENCES MainMenu(MainMenuId)
);



CREATE TABLE InnerSubMenu (
  id INT AUTO_INCREMENT PRIMARY KEY,
  InnerSubMenu VARCHAR(255) NOT NULL,
  DisplayName VARCHAR(255),
  OrderBy INT NOT NULL,
  Status BOOLEAN,
  SubMenuId INT,
  FOREIGN KEY (SubMenuId) REFERENCES SubMenu(id)
);


CREATE TABLE Template (
  id INT AUTO_INCREMENT PRIMARY KEY,
  TemplateName VARCHAR(255) NOT NULL,
  TemplateDescription TEXT,
  selectedMenus longtext,
  status BOOLEAN NOT NULL DEFAULT true
);



SET FOREIGN_KEY_CHECKS = 0



CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  Fullname VARCHAR(255) NOT NULL,
  emailid VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  template_id INT,
  status BOOLEAN,
  FOREIGN KEY (template_id) REFERENCES Template(id)
);










