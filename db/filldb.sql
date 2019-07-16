-- Run to fill APPRAISAL table with sample data
INSERT INTO APPRAISAL ( ID, PROPERTY_ADDRESS, CITY, STATE, ZIP_CODE, BORROWER,
                        OWNER_OF_PUBLIC_RECORD, COUNTY, LEGAL_DESCRIPTION,
                        ASSESSOR_PARCEL_NUM, TAX_YEAR, R_E_TAXES, NEIGHBORHOOD_NAME,
                        MAP_REFERENCE, CENSUS_TRACT, OCCUPANT, SPECIAL_ASSESSMANTS,
                        PUD, HOA, HOA_PAY_FREQ, PROPERTY_RIGHTS_APPRAISED,
                        ASSIGNMENT_TYPE, LENDER_CLIENT, L_C_ADDRESS, FOR_SALE_YES_NO,
                        REPORT_DATA_SOURCES)
VALUES (                1, '123 Fake St', 'Anytown', 'ZZ', '00000', 'John Doe', 'Jane Doe',
                        'FakeCounty', 'House', '12345', '2019', '5000', 'FakeNeighborhood',
                        'MapRef?', 'Census?', 'Owner', '2500', 'yes', '25', 'per month',
                        'Fee Simple', 'Refinance Transaction', 'Alexis Doe', '246 Fake St',
                        'yes', 'Fake Sources');

INSERT INTO APPRAISAL ( ID, PROPERTY_ADDRESS, CITY, STATE, ZIP_CODE, BORROWER,
                        OWNER_OF_PUBLIC_RECORD, COUNTY, LEGAL_DESCRIPTION,
                        ASSESSOR_PARCEL_NUM, TAX_YEAR, R_E_TAXES, NEIGHBORHOOD_NAME,
                        MAP_REFERENCE, CENSUS_TRACT, OCCUPANT, SPECIAL_ASSESSMANTS,
                        PUD, HOA, HOA_PAY_FREQ, PROPERTY_RIGHTS_APPRAISED,
                        ASSIGNMENT_TYPE, LENDER_CLIENT, L_C_ADDRESS, FOR_SALE_YES_NO,
                        REPORT_DATA_SOURCES)
VALUES (                2, '124 Fake St', 'Anytown', 'ZZ', '00000', 'Bob Doe', 'Betty Doe',
                        'FakeCounty', 'Apartment', '98765', '2019', '100000', 'FakeComplex',
                        'MapRef?', 'Census?', 'Tenant', '7500', 'no', '500', 'per year',
                        'Leasehold', 'Purchase Transaction', 'Samantha Doe', '369 Fake St',
                        'no', 'Fake Sources');
