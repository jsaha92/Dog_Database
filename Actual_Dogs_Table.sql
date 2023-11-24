CREATE TABLE Shelters (
    Shelter_ID INT PRIMARY KEY,
    Shelter VARCHAR(50),
    Location VARCHAR(25),
    Website VARCHAR(255) 
);

CREATE TABLE Vets (
    Vet_ID INT PRIMARY KEY,
    Vet_Name VARCHAR(75) NOT NULL,
    Address VARCHAR(255) ,
    Phone VARCHAR(11) ,
    Website VARCHAR(255) 
);


CREATE TABLE Pets (
    Pet_ID INT PRIMARY KEY,
    Name VARCHAR(20) NOT NULL,
    Breed VARCHAR(75),
    Color VARCHAR(50),
    Age VARCHAR(10),
    Size VARCHAR(20),
    Gender VARCHAR(3),
    Weight INT,
    Shelter_ID INT,
    FOREIGN KEY (Shelter_ID) REFERENCES Shelters(Shelter_ID)
);


CREATE TABLE Compatibility (
    Pet_ID INT PRIMARY KEY,
    Good_with_Kids BOOLEAN,
    Good_with_Dogs BOOLEAN,
    Potty_trained BOOLEAN,
    FOREIGN KEY (Pet_ID) REFERENCES Pets(Pet_ID)
);


CREATE TABLE Owners (
    owner_ID INT PRIMARY KEY,
    First_Name VARCHAR(30) NOT NULL,
    Last_Name VARCHAR(30) NOT NULL,
    Age INT,
    Had_Previous_Dog BOOLEAN,
    Home_Size VARCHAR(10),
    Nearest_Shelter INT,
    FOREIGN KEY (Nearest_Shelter) REFERENCES Shelters(Shelter_ID)
);

CREATE TABLE Adoption (
    Pet_ID INT PRIMARY KEY,
    Owner_ID INT,  
    Adoption_Fee INT,
    FOREIGN KEY (Pet_ID) REFERENCES Pets(Pet_ID),
    FOREIGN KEY (Owner_ID) REFERENCES Owners(owner_ID)
);


CREATE TABLE OwnerContact (
    owner_ID INT PRIMARY KEY,
    Phone_Number VARCHAR(10) NOT NULL,
    Email VARCHAR(255),
    FOREIGN KEY (owner_ID) REFERENCES Owners(owner_ID)
);


CREATE TABLE OwnerPreferences (
    owner_ID INT PRIMARY KEY,
    Preferred_Breed VARCHAR(75),
    Preferred_Size VARCHAR(20),
    Preferred_Gender VARCHAR(3),
    Max_Age INT,
    Vaccination_Required BOOLEAN,
    Good_with_Kids_Required BOOLEAN,
    Good_with_Dogs_Required BOOLEAN,
    Potty_Trained_Required BOOLEAN,
    FOREIGN KEY (owner_ID) REFERENCES Owners(owner_ID)
);

CREATE TABLE MedicalHistory (
    Pet_ID INT,
    VaccinationsReceived BOOLEAN,
    Fixed BOOLEAN,
    FOREIGN KEY (Pet_ID) REFERENCES Pets(Pet_ID)
);


CREATE TABLE Events (
    Event_ID INT PRIMARY KEY,
    Event_Name VARCHAR(255),
    Event_Date DATE,
    Shelter_Hosting INT,
    FOREIGN KEY (Shelter_Hosting) REFERENCES Shelters(Shelter_ID)
);
