-- Run this to set up the postgresql database table
-- Should only need to be ran once

--Drop table(s) before making

DROP TABLE APPRAISAL;

CREATE TABLE APPRAISAL(
      ID                      INT          NOT NULL,
      PROPERTY_ADDRESS          VARCHAR(255) NOT NULL,
      CITY                      VARCHAR(255) NOT NULL,
      STATE                     VARCHAR(255) NOT NULL,
      ZIP_CODE                  VARCHAR(255) NOT NULL,
      BORROWER                  VARCHAR(255) NOT NULL,
      OWNER_OF_PUBLIC_RECORD    VARCHAR(255) NOT NULL,
      COUNTY                    VARCHAR(255) NOT NULL,
      LEGAL_DESCRIPTION         VARCHAR(255) NOT NULL,
      ASSESSOR_PARCEL_NUM       VARCHAR(255) NOT NULL,
      TAX_YEAR                  VARCHAR(255) NOT NULL,
      R_E_TAXES                 VARCHAR(255) NOT NULL,
      NEIGHBORHOOD_NAME         VARCHAR(255) NOT NULL,
      MAP_REFERENCE             VARCHAR(255) NOT NULL,
      CENSUS_TRACT              VARCHAR(255) NOT NULL,
      OCCUPANT                  VARCHAR(255) NOT NULL,
      SPECIAL_ASSESSMANTS       VARCHAR(255) NOT NULL,
      PUD                       VARCHAR(255) NOT NULL,
      HOA                       VARCHAR(255) NOT NULL,
      HOA_PAY_FREQ              VARCHAR(255) NOT NULL,
      PROPERTY_RIGHTS_APPRAISED VARCHAR(255) NOT NULL,
      ASSIGNMENT_TYPE           VARCHAR(255) NOT NULL,
      LENDER_CLIENT             VARCHAR(255) NOT NULL,
      L_C_ADDRESS               VARCHAR(255) NOT NULL,
      FOR_SALE_YES_NO           VARCHAR(255) NOT NULL,
      REPORT_DATA_SOURCES       VARCHAR(255) NOT NULL,
      ATTACHMENT_NAME           VARCHAR(255),
      ATTACHMENT_LOCATION       VARCHAR(255),
      PRIMARY KEY (ID)
);
