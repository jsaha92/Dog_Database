-- Combined Shelters and Shelter_Websites table
CREATE TABLE Shelters (
    Shelter_ID INT PRIMARY KEY,
    Shelter VARCHAR(255) NOT NULL,
    Location VARCHAR(255) NOT NULL,
    Website VARCHAR(255) NOT NULL
);

-- Combined Vets and Vet_Websites table
CREATE TABLE Vets (
    Vet_ID INT PRIMARY KEY,
    Vet_Name VARCHAR(255) NOT NULL,
    Address VARCHAR(255) ,
    Phone VARCHAR(20) ,
    Website VARCHAR(255) 
);

-- Create Pets table
CREATE TABLE Pets (
    Pet_ID INT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Breed VARCHAR(255),
    Color VARCHAR(255),
    Age INT,
    Vaccination BOOLEAN,
    Size VARCHAR(50),
    Gender VARCHAR(10),
    Weight DECIMAL(5,2),
    Shelter_ID INT,
    FOREIGN KEY (Shelter_ID) REFERENCES Shelters(Shelter_ID)
);

-- Compatibility table
CREATE TABLE Compatibility (
    Pet_ID INT PRIMARY KEY,
    Good_with_Kids BOOLEAN,
    Good_with_Dogs BOOLEAN,
    Potty_trained BOOLEAN,
    FOREIGN KEY (Pet_ID) REFERENCES Pets(Pet_ID)
);



-- Owners table
CREATE TABLE Owners (
    owner_ID INT PRIMARY KEY,
    First_Name VARCHAR(255) NOT NULL,
    Last_Name VARCHAR(255) NOT NULL,
    Age INT,
    Had_Previous_Dog BOOLEAN,
    Home_Size VARCHAR(50),
    Nearest_Shelter INT,
    FOREIGN KEY (Nearest_Shelter) REFERENCES Shelters(Shelter_ID)
);

-- Create Adoption table
CREATE TABLE Adoption (
    Adoption_ID INT PRIMARY KEY,
    Pet_ID INT,
    Owner_ID INT,  -- New column to reference the owner who adopted the dog
    Adoption_Fee DECIMAL(8,2),
    FOREIGN KEY (Pet_ID) REFERENCES Pets(Pet_ID),
    FOREIGN KEY (Owner_ID) REFERENCES Owners(owner_ID)
);

-- Contact information table
CREATE TABLE OwnerContact (
    ContactID INT PRIMARY KEY,
    owner_ID INT,
    Phone_Number VARCHAR(20) NOT NULL,
    Email VARCHAR(255),
    FOREIGN KEY (owner_ID) REFERENCES Owners(owner_ID)
);

CREATE TABLE OwnerPreferences (
    owner_ID INT PRIMARY KEY,
    Preferred_Breed VARCHAR(255),
    Preferred_Size VARCHAR(50),
    Preferred_Gender VARCHAR(10),
    Max_Age INT,
    Vaccination_Required BOOLEAN,
    Good_with_Kids_Required BOOLEAN,
    Good_with_Dogs_Required BOOLEAN,
    Potty_Trained_Required BOOLEAN,
    FOREIGN KEY (owner_ID) REFERENCES Owners(owner_ID)
);
