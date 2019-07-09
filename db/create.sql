-- Run this to set up the postgresql database table
-- Should only need to be ran once

--Drop table(s) before making

DROP TABLE APPRAISAL;

CREATE TABLE APPRAISAL(
      ID                      INT          NOT NULL,
      PROPERTY_ADDRESS        VARCHAR(255) NOT NULL,
      CITY                    VARCHAR(255) NOT NULL,
      STATE                   VARCHAR(255) NOT NULL,
      ZIP_CODE                VARCHAR(255) NOT NULL,
      BORROWER                VARCHAR(255) NOT NULL,
      OWNER_OF_PUBLIC_RECORD  VARCHAR(255) NOT NULL,
      COUNTY                  VARCHAR(255) NOT NULL,
      PRIMARY KEY (ID)
);
