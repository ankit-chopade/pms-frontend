--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0
-- Dumped by pg_dump version 14.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: Assignments; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA "Assignments";


ALTER SCHEMA "Assignments" OWNER TO postgres;

--
-- Name: humanresources; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA humanresources;


ALTER SCHEMA humanresources OWNER TO postgres;

--
-- Name: patientadministration; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA patientadministration;


ALTER SCHEMA patientadministration OWNER TO postgres;

--
-- Name: person; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA person;


ALTER SCHEMA person OWNER TO postgres;

--
-- Name: production; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA production;


ALTER SCHEMA production OWNER TO postgres;

--
-- Name: sales; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA sales;


ALTER SCHEMA sales OWNER TO postgres;

--
-- Name: hstore; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS hstore WITH SCHEMA public;


--
-- Name: EXTENSION hstore; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION hstore IS 'data type for storing sets of (key, value) pairs';


--
-- Name: postgres_fdw; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgres_fdw WITH SCHEMA public;


--
-- Name: EXTENSION postgres_fdw; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgres_fdw IS 'foreign-data wrapper for remote PostgreSQL servers';


--
-- Name: citydetails; Type: TYPE; Schema: Assignments; Owner: postgres
--

CREATE TYPE "Assignments".citydetails AS (
	cityname character varying(90),
	state character varying(90),
	postalcode integer
);


ALTER TYPE "Assignments".citydetails OWNER TO postgres;

--
-- Name: addr; Type: DOMAIN; Schema: public; Owner: postgres
--

CREATE DOMAIN public.addr AS character varying(90) NOT NULL DEFAULT 'N/A'::character varying;


ALTER DOMAIN public.addr OWNER TO postgres;

--
-- Name: citydetails; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.citydetails AS (
	cityname character varying(90),
	state character varying(90),
	postalcode integer
);


ALTER TYPE public.citydetails OWNER TO postgres;

--
-- Name: addressdetails; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.addressdetails AS (
	addressline character varying(90),
	street character varying(90),
	city public.citydetails
);


ALTER TYPE public.addressdetails OWNER TO postgres;

--
-- Name: allergydetails; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.allergydetails AS (
	allergicto character varying(20),
	allergicsince date,
	allergyreaction character varying(50)
);


ALTER TYPE public.allergydetails OWNER TO postgres;

--
-- Name: idx; Type: DOMAIN; Schema: public; Owner: postgres
--

CREATE DOMAIN public.idx AS integer
	CONSTRAINT idx_check CHECK (((VALUE > 100) AND (VALUE < 999)));


ALTER DOMAIN public.idx OWNER TO postgres;

--
-- Name: salesqtr; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.salesqtr AS ENUM (
    'Jan to Mar',
    'Apr to June',
    'Jul to Sep',
    'Oct to Dec'
);


ALTER TYPE public.salesqtr OWNER TO postgres;

--
-- Name: week; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.week AS ENUM (
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
);


ALTER TYPE public.week OWNER TO postgres;

--
-- Name: updatecust(); Type: PROCEDURE; Schema: Assignments; Owner: postgres
--

CREATE PROCEDURE "Assignments".updatecust()
    LANGUAGE plpgsql
    AS $$
declare
countdis integer:=0;
countinddis integer:=0;
countcust integer:=0;
counter integer:=1;
i integer:=0;
j integer:=0;
discount integer:=0;
begin

select count(*) into countdis from "Assignments".cust_dis;
SELECT count(*) into countcust FROM "Assignments"."Customer";

for i in 1 .. countdis loop -- 1
	raise notice ' i= %',i;
	select count into countinddis from "Assignments".cust_dis where id = i; --2
	for j in 1 .. countinddis loop -- 1 2
		raise notice 'j=%',j;
		select dis into discount FROM "Assignments".cust_dis where id = i;
		update "Assignments"."Customer" set mindiscount = discount where id = counter;
		counter = counter + 1; -- 1
		raise notice 'counter = %',counter;
	end loop;
	if (i = countdis ) then
		i=1;
	end if;
	
	if (counter = countcust+1) then
		exit;
	end if;
end loop;
end; $$;


ALTER PROCEDURE "Assignments".updatecust() OWNER TO postgres;

--
-- Name: create_employee(character varying, character varying, character varying); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.create_employee(IN empname character varying, IN gender character varying, IN email character varying)
    LANGUAGE plpgsql
    AS $$
begin
	INSERT INTO Employees(EmpName,Gender,Email) Values(empname,gender,email);
    commit;
end;$$;


ALTER PROCEDURE public.create_employee(IN empname character varying, IN gender character varying, IN email character varying) OWNER TO postgres;

--
-- Name: extractpatient(json); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.extractpatient(IN pat json)
    LANGUAGE plpgsql
    AS $$
begin
	--pid:=Pat->>'ID'
	raise notice '%',Pat->>'ID';
	raise notice '%',Pat->>'FirstName';
end;$$;


ALTER PROCEDURE public.extractpatient(IN pat json) OWNER TO postgres;

--
-- Name: getempdetails(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.getempdetails(eid integer) RETURNS character varying
    LANGUAGE plpgsql
    AS $$
declare
   empdetails VARCHAR(100);
begin
   select CAST(empid AS VARCHAR)||', '||empname||', '||email INTO empdetails from Employees WHERE EmpID=eid;
   return empdetails;
end;
$$;


ALTER FUNCTION public.getempdetails(eid integer) OWNER TO postgres;

--
-- Name: log_bank_changes(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.log_bank_changes() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
IF NEW.Balance <> OLD.Balance THEN
INSERT INTO bank_audits(AcctID,CustName,changed_on)
VALUES(OLD.AcctID,OLD.AcctID,now());
END IF; 
RETURN NEW;
END;
$$;


ALTER FUNCTION public.log_bank_changes() OWNER TO postgres;

--
-- Name: log_bank_transactions(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.log_bank_transactions() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
TT VARCHAR(20);
Mon INT;
BEGIN
	IF NEW.balance <> OLD.balance THEN
		IF NEW.Balance>OLD.Balance THEN
			TT:='CREDIT';
		ELSE
			TT:='DEBIT';
		END IF;
		Mon=CAST((OLD.Balance-NEW.Balance) AS INTEGER);
		Mon:=ABS(Mon);
         INSERT INTO Transactions(AccountID,TransAmount,TransType,TransDate)
         VALUES(NEW.AccountID,CAST(Mon AS Money),TT,now());
    END IF;

	RETURN NEW;
END;
$$;


ALTER FUNCTION public.log_bank_transactions() OWNER TO postgres;

--
-- Name: log_empname_changes(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.log_empname_changes() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	IF NEW.empname <> OLD.empname THEN
		 INSERT INTO employee_update_audits(empid,empname,changed_on)
		 VALUES(OLD.empid,OLD.empname,now());
	END IF;

	RETURN NEW;
END;
$$;


ALTER FUNCTION public.log_empname_changes() OWNER TO postgres;

--
-- Name: testprocedure(); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.testprocedure()
    LANGUAGE plpgsql
    AS $$
declare
	empcount integer := 0;
	currenttime time := now();
	currentdate date := now();
	ename Employees.empname%type;
	emprecord Employees%rowtype;
begin
	SELECT count(*) INTO empcount FROM Employees;
	raise notice 'Total Employees: %', empcount;
	raise notice 'Date: %', currentdate;
	raise notice 'Time: %', currenttime;
	Select empname into ename from Employees where empid=1;
	raise notice 'Emp Name: %', ename;
	Select * into emprecord from Employees where empid=1;
	raise notice 'Emp Row: %', emprecord;
	raise notice 'Emp Email: %', emprecord.email;
end;$$;


ALTER PROCEDURE public.testprocedure() OWNER TO postgres;

--
-- Name: transfer(integer, integer, numeric); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.transfer(IN sender integer, IN receiver integer, IN amount numeric)
    LANGUAGE plpgsql
    AS $$
begin
    -- subtracting the amount from the sender's account 
    update accounts 
    set balance = balance - amount 
    where id = sender;

    -- adding the amount to the receiver's account
    update accounts 
    set balance = balance + amount 
    where id = receiver;

    commit;
end;$$;


ALTER PROCEDURE public.transfer(IN sender integer, IN receiver integer, IN amount numeric) OWNER TO postgres;

--
-- Name: updatecost(integer, integer); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.updatecost(IN prodid integer, IN prodcost integer)
    LANGUAGE plpgsql
    AS $$
declare
prodcosttbl integer :=1;
begin
select productcost into prodcosttbl from production.Product where productid=prodid;
if(prodcost > prodcosttbl ) then 
	update production.Product set productcost = prodcost where productid=prodid;
	raise notice 'Cost has been Updated';
else
	raise notice 'Cost not Updated';
end if;

end; $$;


ALTER PROCEDURE public.updatecost(IN prodid integer, IN prodcost integer) OWNER TO postgres;

--
-- Name: updatecust(); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.updatecust()
    LANGUAGE plpgsql
    AS $$
declare
countdis integer:=0;
countinddis integer:=0;
countcust integer:=0;
counter integer:=1;
i integer:=0;
j integer:=0;
discount integer:=0;
begin

select count(*) into countdis from "Assignments".cust_dis;
SELECT count(*) into countcust FROM "Assignments"."Customer";

for i in 1 .. countdis loop -- 1
	raise notice ' i= %',i;
	select count into countinddis from "Assignments".cust_dis where id = i; --2
	for j in 1 .. countinddis loop -- 1 2
		raise notice 'j=%',j;
		select dis into discount FROM "Assignments".cust_dis where id = i;
		update "Assignments"."Customer" set mindiscount = discount where id = counter;
		counter = counter + 1; -- 1
		raise notice 'counter = %',counter;
	end loop;
	if (i = countdis ) then
		i=1;
	end if;
	
	if (counter = countcust+1) then
		exit;
	end if;
end loop;
end; $$;


ALTER PROCEDURE public.updatecust() OWNER TO postgres;

--
-- Name: fdw_mssql; Type: FOREIGN DATA WRAPPER; Schema: -; Owner: postgres
--

CREATE FOREIGN DATA WRAPPER fdw_mssql HANDLER public.postgres_fdw_handler;


ALTER FOREIGN DATA WRAPPER fdw_mssql OWNER TO postgres;

--
-- Name: mssql_adworks2014_server; Type: SERVER; Schema: -; Owner: postgres
--

CREATE SERVER mssql_adworks2014_server FOREIGN DATA WRAPPER fdw_mssql OPTIONS (
    port '1433',
    servername E'TOUSIFB-MSL2\\MSSQLSERVER2019'
);


ALTER SERVER mssql_adworks2014_server OWNER TO postgres;

--
-- Name: USER MAPPING postgres SERVER mssql_adworks2014_server; Type: USER MAPPING; Schema: -; Owner: postgres
--

CREATE USER MAPPING FOR postgres SERVER mssql_adworks2014_server OPTIONS (
    password 'password_123',
    username 'sa'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: BankAccounts; Type: TABLE; Schema: Assignments; Owner: postgres
--

CREATE TABLE "Assignments"."BankAccounts" (
    "AcctID" integer NOT NULL,
    "CustName" character varying,
    "AcctType" character varying,
    "Balance" integer
);


ALTER TABLE "Assignments"."BankAccounts" OWNER TO postgres;

--
-- Name: customer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customer (
    id integer,
    name character varying(50),
    listtype character varying(50),
    mindiscount integer
);


ALTER TABLE public.customer OWNER TO postgres;

--
-- Name: Customer; Type: TABLE; Schema: Assignments; Owner: postgres
--

CREATE TABLE "Assignments"."Customer" (
)
INHERITS (public.customer);


ALTER TABLE "Assignments"."Customer" OWNER TO postgres;

--
-- Name: cust_dis; Type: TABLE; Schema: Assignments; Owner: postgres
--

CREATE TABLE "Assignments".cust_dis (
    id integer,
    dis integer,
    count integer
);


ALTER TABLE "Assignments".cust_dis OWNER TO postgres;

--
-- Name: department; Type: TABLE; Schema: humanresources; Owner: postgres
--

CREATE TABLE humanresources.department (
    departmentid integer NOT NULL,
    departmentname character varying(20)
);


ALTER TABLE humanresources.department OWNER TO postgres;

--
-- Name: employee; Type: TABLE; Schema: humanresources; Owner: postgres
--

CREATE TABLE humanresources.employee (
    employeeid integer NOT NULL,
    designation character varying(20),
    managerid character varying(10),
    dateofjoining date,
    departmentid integer,
    personid integer
);


ALTER TABLE humanresources.employee OWNER TO postgres;

--
-- Name: patient; Type: TABLE; Schema: patientadministration; Owner: postgres
--

CREATE TABLE patientadministration.patient (
    pid integer NOT NULL,
    pname character varying(50) NOT NULL,
    dob date,
    gender character varying(2),
    city character varying(50) DEFAULT 'NA'::character varying,
    CONSTRAINT patient_dob_check CHECK ((dob < '2022-01-05'::date)),
    CONSTRAINT patient_gender_check CHECK (((gender)::text = ANY ((ARRAY['F'::character varying, 'M'::character varying, 'O'::character varying, 'U'::character varying])::text[])))
);


ALTER TABLE patientadministration.patient OWNER TO postgres;

--
-- Name: patient_pid_seq; Type: SEQUENCE; Schema: patientadministration; Owner: postgres
--

CREATE SEQUENCE patientadministration.patient_pid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE patientadministration.patient_pid_seq OWNER TO postgres;

--
-- Name: patient_pid_seq; Type: SEQUENCE OWNED BY; Schema: patientadministration; Owner: postgres
--

ALTER SEQUENCE patientadministration.patient_pid_seq OWNED BY patientadministration.patient.pid;


--
-- Name: patientrelative; Type: TABLE; Schema: patientadministration; Owner: postgres
--

CREATE TABLE patientadministration.patientrelative (
    relativeid integer NOT NULL,
    relativename character varying(20) NOT NULL,
    relation character varying(20),
    pid integer
);


ALTER TABLE patientadministration.patientrelative OWNER TO postgres;

--
-- Name: patientrelative_relativeid_seq; Type: SEQUENCE; Schema: patientadministration; Owner: postgres
--

CREATE SEQUENCE patientadministration.patientrelative_relativeid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE patientadministration.patientrelative_relativeid_seq OWNER TO postgres;

--
-- Name: patientrelative_relativeid_seq; Type: SEQUENCE OWNED BY; Schema: patientadministration; Owner: postgres
--

ALTER SEQUENCE patientadministration.patientrelative_relativeid_seq OWNED BY patientadministration.patientrelative.relativeid;


--
-- Name: person; Type: TABLE; Schema: person; Owner: postgres
--

CREATE TABLE person.person (
    personid integer NOT NULL,
    title character varying(6),
    firstname character varying(20),
    middlename character varying(20),
    lastname character varying(20),
    gender character varying(20),
    modifieddate date
);


ALTER TABLE person.person OWNER TO postgres;

--
-- Name: product; Type: TABLE; Schema: production; Owner: postgres
--

CREATE TABLE production.product (
    productid integer NOT NULL,
    productname character varying(20),
    productcost integer,
    quantityinstock integer,
    productsubcategoryid integer
);


ALTER TABLE production.product OWNER TO postgres;

--
-- Name: productcategory; Type: TABLE; Schema: production; Owner: postgres
--

CREATE TABLE production.productcategory (
    productcategoryid integer NOT NULL,
    productcategoryname character varying(20)
);


ALTER TABLE production.productcategory OWNER TO postgres;

--
-- Name: productsubcategory; Type: TABLE; Schema: production; Owner: postgres
--

CREATE TABLE production.productsubcategory (
    productsubcategoryid integer NOT NULL,
    productsubcategoryname character varying(20),
    productcategoryid integer
);


ALTER TABLE production.productsubcategory OWNER TO postgres;

--
-- Name: accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accounts (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    balance numeric(15,2) NOT NULL
);


ALTER TABLE public.accounts OWNER TO postgres;

--
-- Name: accounts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.accounts ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.accounts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: bank_audits; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bank_audits (
    auditid integer NOT NULL,
    acctid integer NOT NULL,
    custname character varying(40) NOT NULL,
    changed_on timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.bank_audits OWNER TO postgres;

--
-- Name: bank_audits_auditid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.bank_audits ALTER COLUMN auditid ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.bank_audits_auditid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: bankaccounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bankaccounts (
    accountid integer NOT NULL,
    custname character varying(40) NOT NULL,
    balance money,
    accttype character varying(40) NOT NULL
);


ALTER TABLE public.bankaccounts OWNER TO postgres;

--
-- Name: bankaccounts_accountid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.bankaccounts ALTER COLUMN accountid ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.bankaccounts_accountid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: empcount; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.empcount (
    count bigint
);


ALTER TABLE public.empcount OWNER TO postgres;

--
-- Name: empdetails; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.empdetails (
    "?column?" text
);


ALTER TABLE public.empdetails OWNER TO postgres;

--
-- Name: emphstore; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.emphstore (
    empid integer NOT NULL,
    empname character varying(50),
    address public.hstore
);


ALTER TABLE public.emphstore OWNER TO postgres;

--
-- Name: emphstore_empid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.emphstore_empid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.emphstore_empid_seq OWNER TO postgres;

--
-- Name: emphstore_empid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.emphstore_empid_seq OWNED BY public.emphstore.empid;


--
-- Name: empjson; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.empjson (
    emp json
);


ALTER TABLE public.empjson OWNER TO postgres;

--
-- Name: employee_update_audits; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employee_update_audits (
    auditid integer NOT NULL,
    empid integer NOT NULL,
    empname character varying(40) NOT NULL,
    changed_on timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.employee_update_audits OWNER TO postgres;

--
-- Name: employee_update_audits_auditid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.employee_update_audits ALTER COLUMN auditid ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.employee_update_audits_auditid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employees (
    empid integer NOT NULL,
    empname character varying(50) NOT NULL,
    gender character varying(50) NOT NULL,
    email character varying(255) NOT NULL
);


ALTER TABLE public.employees OWNER TO postgres;

--
-- Name: employees_empid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employees_empid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employees_empid_seq OWNER TO postgres;

--
-- Name: employees_empid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employees_empid_seq OWNED BY public.employees.empid;


--
-- Name: ename; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ename (
    empname character varying(50)
);


ALTER TABLE public.ename OWNER TO postgres;

--
-- Name: friendlist; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.friendlist (
    personid integer,
    personname text,
    oldfriends text[],
    newfriends text[]
);


ALTER TABLE public.friendlist OWNER TO postgres;

--
-- Name: location; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.location (
    address public.addr,
    index public.idx
);


ALTER TABLE public.location OWNER TO postgres;

--
-- Name: mssql_adworks2014_sales_salesperson_table; Type: FOREIGN TABLE; Schema: public; Owner: postgres
--

CREATE FOREIGN TABLE public.mssql_adworks2014_sales_salesperson_table (
    businessentityid integer NOT NULL,
    territoryid integer,
    salesquota money,
    bonus money NOT NULL,
    commissionpct real NOT NULL,
    salesytd money NOT NULL,
    saleslastyear money NOT NULL,
    modifieddate text NOT NULL
)
SERVER mssql_adworks2014_server
OPTIONS (
    database 'AdventureWorks2014',
    query 'SELECT BusinessEntityID, TerritoryID, SalesQuota, 
		 Bonus, CommissionPct, SalesYTD, SalesLastYear,ModifiedDate FROM Sales.SalesPerson'
);


ALTER FOREIGN TABLE public.mssql_adworks2014_sales_salesperson_table OWNER TO postgres;

--
-- Name: orgsales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orgsales (
    salesid integer,
    orgname character varying(20),
    salesamount money,
    quarter public.salesqtr
);


ALTER TABLE public.orgsales OWNER TO postgres;

--
-- Name: patient; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.patient (
    id integer NOT NULL,
    familyname character varying(20),
    givenname character varying(20),
    gender character varying(20)
);


ALTER TABLE public.patient OWNER TO postgres;

--
-- Name: patientdata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.patientdata (
    patientid integer NOT NULL,
    patientname character varying(50),
    allergy public.allergydetails
);


ALTER TABLE public.patientdata OWNER TO postgres;

--
-- Name: patientdata_patientid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.patientdata ALTER COLUMN patientid ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.patientdata_patientid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: servicerequest; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.servicerequest (
    id integer NOT NULL,
    patid integer,
    requesttype character varying(20),
    description character varying(500)
);


ALTER TABLE public.servicerequest OWNER TO postgres;

--
-- Name: servicerequest_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.servicerequest_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.servicerequest_id_seq OWNER TO postgres;

--
-- Name: servicerequest_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.servicerequest_id_seq OWNED BY public.servicerequest.id;


--
-- Name: testdata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.testdata (
    testid integer
);


ALTER TABLE public.testdata OWNER TO postgres;

--
-- Name: testnumbers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.testnumbers (
    num integer
);


ALTER TABLE public.testnumbers OWNER TO postgres;

--
-- Name: trainerschedule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trainerschedule (
    trainerid integer NOT NULL,
    trainername character varying(50),
    contactno text[],
    schedule text[]
);


ALTER TABLE public.trainerschedule OWNER TO postgres;

--
-- Name: trainerschedule_trainerid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.trainerschedule ALTER COLUMN trainerid ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.trainerschedule_trainerid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transactions (
    transid integer NOT NULL,
    accountid integer,
    transamount money,
    transtype character varying(20),
    transdate timestamp(6) without time zone
);


ALTER TABLE public.transactions OWNER TO postgres;

--
-- Name: transactions_transid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.transactions ALTER COLUMN transid ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.transactions_transid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: country; Type: TABLE; Schema: sales; Owner: postgres
--

CREATE TABLE sales.country (
    countryid integer NOT NULL,
    countryname character varying(20)
);


ALTER TABLE sales.country OWNER TO postgres;

--
-- Name: customer; Type: TABLE; Schema: sales; Owner: postgres
--

CREATE TABLE sales.customer (
    customerid integer NOT NULL,
    personid integer,
    territoryid integer,
    customergrade character varying(10)
);


ALTER TABLE sales.customer OWNER TO postgres;

--
-- Name: salesorderdetail; Type: TABLE; Schema: sales; Owner: postgres
--

CREATE TABLE sales.salesorderdetail (
    salesorderdetailid integer NOT NULL,
    salesorderheaderid integer,
    productid integer,
    orderquantity integer
);


ALTER TABLE sales.salesorderdetail OWNER TO postgres;

--
-- Name: salesorderheader; Type: TABLE; Schema: sales; Owner: postgres
--

CREATE TABLE sales.salesorderheader (
    salesorderheaderid integer NOT NULL,
    orderdate date,
    customerid integer,
    employeeid integer
);


ALTER TABLE sales.salesorderheader OWNER TO postgres;

--
-- Name: territory; Type: TABLE; Schema: sales; Owner: postgres
--

CREATE TABLE sales.territory (
    territoryid integer NOT NULL,
    territoryname character varying(20),
    countryid integer
);


ALTER TABLE sales.territory OWNER TO postgres;

--
-- Name: patient pid; Type: DEFAULT; Schema: patientadministration; Owner: postgres
--

ALTER TABLE ONLY patientadministration.patient ALTER COLUMN pid SET DEFAULT nextval('patientadministration.patient_pid_seq'::regclass);


--
-- Name: patientrelative relativeid; Type: DEFAULT; Schema: patientadministration; Owner: postgres
--

ALTER TABLE ONLY patientadministration.patientrelative ALTER COLUMN relativeid SET DEFAULT nextval('patientadministration.patientrelative_relativeid_seq'::regclass);


--
-- Name: emphstore empid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.emphstore ALTER COLUMN empid SET DEFAULT nextval('public.emphstore_empid_seq'::regclass);


--
-- Name: employees empid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees ALTER COLUMN empid SET DEFAULT nextval('public.employees_empid_seq'::regclass);


--
-- Name: servicerequest id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicerequest ALTER COLUMN id SET DEFAULT nextval('public.servicerequest_id_seq'::regclass);


--
-- Data for Name: BankAccounts; Type: TABLE DATA; Schema: Assignments; Owner: postgres
--

COPY "Assignments"."BankAccounts" ("AcctID", "CustName", "AcctType", "Balance") FROM stdin;
1	Ankit	svg	100000
2	Saurabh	curr	120000
\.


--
-- Data for Name: Customer; Type: TABLE DATA; Schema: Assignments; Owner: postgres
--

COPY "Assignments"."Customer" (id, name, listtype, mindiscount) FROM stdin;
1	Ankit	\N	10
2	Saurabh	\N	10
3	Rahul	\N	15
4	Nishi	\N	15
4	Nidhi	\N	15
4	Maneesh	\N	15
5	Abhijeet	\N	12
6	Harsh	\N	5
8	Jayashree	\N	5
9	Amit	\N	3
\.


--
-- Data for Name: cust_dis; Type: TABLE DATA; Schema: Assignments; Owner: postgres
--

COPY "Assignments".cust_dis (id, dis, count) FROM stdin;
2	15	2
3	12	1
4	5	3
1	10	2
\.


--
-- Data for Name: department; Type: TABLE DATA; Schema: humanresources; Owner: postgres
--

COPY humanresources.department (departmentid, departmentname) FROM stdin;
1	HR
2	Sales
3	Finance
4	Production
\.


--
-- Data for Name: employee; Type: TABLE DATA; Schema: humanresources; Owner: postgres
--

COPY humanresources.employee (employeeid, designation, managerid, dateofjoining, departmentid, personid) FROM stdin;
1	Sales Person	5	2020-12-29	2	1
2	Sales Person	5	2021-01-08	2	2
3	Sales Person	6	2020-12-28	2	3
4	Sales Person	6	2020-12-29	2	4
5	Sr. Manager	\N	2020-03-04	1	5
6	Manager	5	2020-12-19	3	6
\.


--
-- Data for Name: patient; Type: TABLE DATA; Schema: patientadministration; Owner: postgres
--

COPY patientadministration.patient (pid, pname, dob, gender, city) FROM stdin;
\.


--
-- Data for Name: patientrelative; Type: TABLE DATA; Schema: patientadministration; Owner: postgres
--

COPY patientadministration.patientrelative (relativeid, relativename, relation, pid) FROM stdin;
\.


--
-- Data for Name: person; Type: TABLE DATA; Schema: person; Owner: postgres
--

COPY person.person (personid, title, firstname, middlename, lastname, gender, modifieddate) FROM stdin;
1	Mr.	Jack	R	Samuels	Male	2020-11-09
2	Ms.	Gail	J	Erickson	Female	2020-11-07
4	Dr.	Shane	K	Willson	Male	2020-11-09
5	Mr.	Gary	D	Bush	Male	2020-11-06
6	Ms.	Catherine	E	Ramirez	Female	2020-11-20
7	Mr.	Ajay	R	Mehta	Male	2020-10-23
9	Ms.	Rashmi	T	Jain	Female	2020-11-28
10	Mr.	Ketan	P	Jha	Male	2020-11-23
11	Ms.	Hema	G	Mehrotra	Female	2020-11-28
12	Mr.	Zohran	S	Khanna	Male	2020-11-18
8	Ms.	Sita	G	Paul	Female	2020-08-02
3	Ms.	Stacy	PPPP	Malcom	Female	2021-01-25
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: production; Owner: postgres
--

COPY production.product (productid, productname, productcost, quantityinstock, productsubcategoryid) FROM stdin;
1	Samsung 60inch Curve	100000	100	1
2	LG 32	31499	90	1
3	Chrome 2.0	41999	12	1
4	HP Spectre Gold	210099	34	2
5	Sony Vaio E-Ser	32999	17	2
6	LG Automa A-119	10999	8	3
7	GAS-G009 T Shirt	999	55	4
8	Fransisca Tee	499	23	5
9	Levis Jeans	4100	31	5
10	J&J Jacket	1199	16	6
12	Baba Tees	1200	98	6
13	Harper Spoons	12	99	7
14	Glow Stickers	199	5	7
11	UCB Bag	4100	87	6
\.


--
-- Data for Name: productcategory; Type: TABLE DATA; Schema: production; Owner: postgres
--

COPY production.productcategory (productcategoryid, productcategoryname) FROM stdin;
1	Electronics
2	Fashion
3	Household
\.


--
-- Data for Name: productsubcategory; Type: TABLE DATA; Schema: production; Owner: postgres
--

COPY production.productsubcategory (productsubcategoryid, productsubcategoryname, productcategoryid) FROM stdin;
1	TV	1
2	Laptop	1
3	Washing Machine	1
4	Menswear	2
5	For her	2
6	Kidswear	2
7	Cutlery	3
8	Decor	3
\.


--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.accounts (id, name, balance) FROM stdin;
1	Bob	10000.00
2	Alice	10000.00
\.


--
-- Data for Name: bank_audits; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bank_audits (auditid, acctid, custname, changed_on) FROM stdin;
\.


--
-- Data for Name: bankaccounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bankaccounts (accountid, custname, balance, accttype) FROM stdin;
1	Jane	$89,000.00	SAVING
2	Matthew	$90,000.00	CURRENT
3	Kate	$50,000.00	SAVING
\.


--
-- Data for Name: customer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customer (id, name, listtype, mindiscount) FROM stdin;
\.


--
-- Data for Name: empcount; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.empcount (count) FROM stdin;
3
\.


--
-- Data for Name: empdetails; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.empdetails ("?column?") FROM stdin;
1, Jane, jane.bravo@testorg.com
2, Matthew, matthew.reevs@testorg.com
3, Kate, kate.m@testorg.com
\.


--
-- Data for Name: emphstore; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.emphstore (empid, empname, address) FROM stdin;
1	John Doe	"City"=>"NewYork", "Street"=>"123, Avenue Street", "Country"=>"USA"
2	Nimit Sharma	"City"=>"Mumbai", "Street"=>"M.G.Road, Mulund", "Country"=>"India", "PostalCode"=>"400080"
\.


--
-- Data for Name: empjson; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.empjson (emp) FROM stdin;
{\n\t\t\t\t\t\t\t\t"ID":1,\n\t\t\t\t\t\t\t\t"FirstName":"Jason",\n\t\t\t\t\t\t\t\t"LastName":"Bravo",\n\t\t\t\t\t\t\t\t"Gender":"Male",\n\t\t\t\t\t\t\t\t"Salary":3000\n\t\t\t\t\t\t\t}
{\n\t\t\t\t\t\t\t\t"ID":2,\n\t\t\t\t\t\t\t\t"FirstName":"Stacy",\n\t\t\t\t\t\t\t\t"LastName":"Biden",\n\t\t\t\t\t\t\t\t"Gender":"Female",\n\t\t\t\t\t\t\t\t"Salary":5000,\n\t\t\t\t\t\t\t\t"Address":{\n\t\t\t\t\t\t\t\t\t"Street":"12, North Well",\n\t\t\t\t\t\t\t\t\t"City":"New York",\n\t\t\t\t\t\t\t\t\t"Country":"USA"\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}
{\n\t\t\t\t\t\t\t\t"ID":3,\n\t\t\t\t\t\t\t\t"FirstName":"Park",\n\t\t\t\t\t\t\t\t"LastName":"Brown",\n\t\t\t\t\t\t\t\t"Gender":"Male",\n\t\t\t\t\t\t\t\t"Salary":5000,\n\t\t\t\t\t\t\t\t"Address":{\n\t\t\t\t\t\t\t\t\t"Street":"12, South Well",\n\t\t\t\t\t\t\t\t\t"City":"ABC",\n\t\t\t\t\t\t\t\t\t"Country":"Spain"\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t"Contact":["2938293","23234334"]\n\t\t\t\t\t\t\t}
\.


--
-- Data for Name: employee_update_audits; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employee_update_audits (auditid, empid, empname, changed_on) FROM stdin;
17	3	Kate	2021-04-09 15:55:27.748297
18	1	Jane	2021-04-09 15:55:27.748297
19	3	A	2021-04-09 15:55:54.071081
20	1	A	2021-04-09 15:55:58.715925
\.


--
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employees (empid, empname, gender, email) FROM stdin;
2	Matthew	Male	matthew.reevs@testorg.com
3	Kate	Female	kate.m@testorg.com
1	Jane	Female	jane.bravo@testorg.com
\.


--
-- Data for Name: ename; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ename (empname) FROM stdin;
Jane
\.


--
-- Data for Name: friendlist; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.friendlist (personid, personname, oldfriends, newfriends) FROM stdin;
1	John	{A,B}	{C,D}
199	Jonny	{1,2}	{3,4}
100	Jane	{C,D}	{A,B}
1990	Jenny	{2,3}	{4,5}
\.


--
-- Data for Name: location; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.location (address, index) FROM stdin;
N/A	101
ABC	102
\.


--
-- Data for Name: orgsales; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orgsales (salesid, orgname, salesamount, quarter) FROM stdin;
1	ACC Ltd.	$299,292.00	Jan to Mar
2	Nic Inductries	$499,444.00	Jul to Sep
\.


--
-- Data for Name: patient; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.patient (id, familyname, givenname, gender) FROM stdin;
1	Sharma	Rohit	Male
2	Kapoor	Reena	Female
3	Mhatre	Sonali	Female
4	Gupta	Himesh	Male
\.


--
-- Data for Name: patientdata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.patientdata (patientid, patientname, allergy) FROM stdin;
1	John	(Dust,1999-10-12,Cold)
2	Matthew	("Warm Water",2020-01-14,"Skin Rashes")
\.


--
-- Data for Name: servicerequest; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.servicerequest (id, patid, requesttype, description) FROM stdin;
1	1	Consulting	Consulting for pain in Chest since 3 months
2	2	Lab	Lab test fo CBC and Heamoglobin
\.


--
-- Data for Name: testdata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.testdata (testid) FROM stdin;
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
130
\.


--
-- Data for Name: testnumbers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.testnumbers (num) FROM stdin;
8
9
10
12
13
14
15
16
17
18
19
20
21
1111
\.


--
-- Data for Name: trainerschedule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trainerschedule (trainerid, trainername, contactno, schedule) FROM stdin;
9	Jhon Doe	{(098)23839011,(082)29287389}	{{Monday,Wednesday},{"10:00am to 05:00pm","11:00am to 03:00pm"}}
10	Jane Winsent	{(098)73839991,(082)99987389}	{{Tuesday,Saturday},{"12:00pm to 06:00pm","09:00am to 11:00am"}}
11	Mervin Warner	{(094)56569991,(067)45627389}	{{Monday,Saturday},{"09:00am to 11:00am","11:00am to 02:00pm"}}
12	Jason Blink	{(094)56569991,(067)45627389}	{{Monday,Thursday},{"09:00am to 11:00am","11:00am to 02:00pm"}}
\.


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transactions (transid, accountid, transamount, transtype, transdate) FROM stdin;
\.


--
-- Data for Name: country; Type: TABLE DATA; Schema: sales; Owner: postgres
--

COPY sales.country (countryid, countryname) FROM stdin;
1	India
2	Malaysia
3	China
4	Austrailia
5	UAE
\.


--
-- Data for Name: customer; Type: TABLE DATA; Schema: sales; Owner: postgres
--

COPY sales.customer (customerid, personid, territoryid, customergrade) FROM stdin;
1	7	1	Grade-A
2	8	2	Grade-A
3	9	2	Grade-B
4	10	1	Grade-B
5	11	2	Grade-B
6	12	1	Grade-C
\.


--
-- Data for Name: salesorderdetail; Type: TABLE DATA; Schema: sales; Owner: postgres
--

COPY sales.salesorderdetail (salesorderdetailid, salesorderheaderid, productid, orderquantity) FROM stdin;
1	1	1	2
2	1	2	1
3	1	5	1
4	2	6	2
5	2	8	5
6	3	5	2
7	3	3	3
8	3	2	2
9	4	14	2
10	5	13	3
11	5	12	1
12	6	2	12
13	7	3	3
14	8	9	6
15	8	10	10
16	9	3	3
17	10	2	2
18	10	11	6
19	10	12	3
20	10	2	2
21	11	14	7
22	1	5	3
23	12	8	2
24	12	10	5
\.


--
-- Data for Name: salesorderheader; Type: TABLE DATA; Schema: sales; Owner: postgres
--

COPY sales.salesorderheader (salesorderheaderid, orderdate, customerid, employeeid) FROM stdin;
1	2021-02-08	1	1
2	2021-02-05	1	1
3	2021-02-02	1	3
4	2021-02-08	3	2
5	2021-02-06	3	4
6	2021-02-02	4	4
7	2021-02-07	4	3
8	2021-02-06	2	2
9	2021-02-02	1	3
10	2021-02-08	1	1
11	2021-02-15	2	2
12	2021-02-12	3	4
\.


--
-- Data for Name: territory; Type: TABLE DATA; Schema: sales; Owner: postgres
--

COPY sales.territory (territoryid, territoryname, countryid) FROM stdin;
1	Mumbai	1
2	Delhi	1
3	Bangalore	1
4	Kuala Lampur	2
5	Seremban	2
6	Putrajaya	2
7	Shanjhai	3
8	Chongqing	3
9	Hangzhou	3
10	Sydney	4
11	Perth	4
12	Brisbane	4
13	Dubai	5
14	Ajman	5
15	Masdar City	5
16	Fujairah	5
\.


--
-- Name: patient_pid_seq; Type: SEQUENCE SET; Schema: patientadministration; Owner: postgres
--

SELECT pg_catalog.setval('patientadministration.patient_pid_seq', 1, false);


--
-- Name: patientrelative_relativeid_seq; Type: SEQUENCE SET; Schema: patientadministration; Owner: postgres
--

SELECT pg_catalog.setval('patientadministration.patientrelative_relativeid_seq', 1, false);


--
-- Name: accounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.accounts_id_seq', 2, true);


--
-- Name: bank_audits_auditid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bank_audits_auditid_seq', 1, false);


--
-- Name: bankaccounts_accountid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bankaccounts_accountid_seq', 3, true);


--
-- Name: emphstore_empid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.emphstore_empid_seq', 2, true);


--
-- Name: employee_update_audits_auditid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employee_update_audits_auditid_seq', 20, true);


--
-- Name: employees_empid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employees_empid_seq', 3, true);


--
-- Name: patientdata_patientid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.patientdata_patientid_seq', 2, true);


--
-- Name: servicerequest_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.servicerequest_id_seq', 2, true);


--
-- Name: trainerschedule_trainerid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.trainerschedule_trainerid_seq', 12, true);


--
-- Name: transactions_transid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transactions_transid_seq', 1, false);


--
-- Name: BankAccounts BankAccounts_pkey; Type: CONSTRAINT; Schema: Assignments; Owner: postgres
--

ALTER TABLE ONLY "Assignments"."BankAccounts"
    ADD CONSTRAINT "BankAccounts_pkey" PRIMARY KEY ("AcctID");


--
-- Name: department department_pkey; Type: CONSTRAINT; Schema: humanresources; Owner: postgres
--

ALTER TABLE ONLY humanresources.department
    ADD CONSTRAINT department_pkey PRIMARY KEY (departmentid);


--
-- Name: employee employee_pkey; Type: CONSTRAINT; Schema: humanresources; Owner: postgres
--

ALTER TABLE ONLY humanresources.employee
    ADD CONSTRAINT employee_pkey PRIMARY KEY (employeeid);


--
-- Name: patient patient_pkey; Type: CONSTRAINT; Schema: patientadministration; Owner: postgres
--

ALTER TABLE ONLY patientadministration.patient
    ADD CONSTRAINT patient_pkey PRIMARY KEY (pid);


--
-- Name: patientrelative patientrelative_pkey; Type: CONSTRAINT; Schema: patientadministration; Owner: postgres
--

ALTER TABLE ONLY patientadministration.patientrelative
    ADD CONSTRAINT patientrelative_pkey PRIMARY KEY (relativeid);


--
-- Name: person person_pkey; Type: CONSTRAINT; Schema: person; Owner: postgres
--

ALTER TABLE ONLY person.person
    ADD CONSTRAINT person_pkey PRIMARY KEY (personid);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (productid);


--
-- Name: productcategory productcategory_pkey; Type: CONSTRAINT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.productcategory
    ADD CONSTRAINT productcategory_pkey PRIMARY KEY (productcategoryid);


--
-- Name: productsubcategory productsubcategory_pkey; Type: CONSTRAINT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.productsubcategory
    ADD CONSTRAINT productsubcategory_pkey PRIMARY KEY (productsubcategoryid);


--
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);


--
-- Name: bankaccounts bankaccounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bankaccounts
    ADD CONSTRAINT bankaccounts_pkey PRIMARY KEY (accountid);


--
-- Name: emphstore emphstore_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.emphstore
    ADD CONSTRAINT emphstore_pkey PRIMARY KEY (empid);


--
-- Name: employees employees_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key UNIQUE (email);


--
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (empid);


--
-- Name: patient patient_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patient
    ADD CONSTRAINT patient_pkey PRIMARY KEY (id);


--
-- Name: trainerschedule trainerschedule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trainerschedule
    ADD CONSTRAINT trainerschedule_pkey PRIMARY KEY (trainerid);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (transid);


--
-- Name: country country_pkey; Type: CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.country
    ADD CONSTRAINT country_pkey PRIMARY KEY (countryid);


--
-- Name: customer customer_pkey; Type: CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (customerid);


--
-- Name: salesorderdetail salesorderdetail_pkey; Type: CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.salesorderdetail
    ADD CONSTRAINT salesorderdetail_pkey PRIMARY KEY (salesorderdetailid);


--
-- Name: salesorderheader salesorderheader_pkey; Type: CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.salesorderheader
    ADD CONSTRAINT salesorderheader_pkey PRIMARY KEY (salesorderheaderid);


--
-- Name: territory territory_pkey; Type: CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.territory
    ADD CONSTRAINT territory_pkey PRIMARY KEY (territoryid);


--
-- Name: bankaccounts tr_bankbalance_updates; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER tr_bankbalance_updates BEFORE UPDATE ON public.bankaccounts FOR EACH ROW EXECUTE FUNCTION public.log_bank_transactions();


--
-- Name: employees tr_name_changes; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER tr_name_changes BEFORE UPDATE ON public.employees FOR EACH ROW EXECUTE FUNCTION public.log_empname_changes();


--
-- Name: employee employee_departmentid_fkey; Type: FK CONSTRAINT; Schema: humanresources; Owner: postgres
--

ALTER TABLE ONLY humanresources.employee
    ADD CONSTRAINT employee_departmentid_fkey FOREIGN KEY (departmentid) REFERENCES humanresources.department(departmentid);


--
-- Name: employee employee_personid_fkey; Type: FK CONSTRAINT; Schema: humanresources; Owner: postgres
--

ALTER TABLE ONLY humanresources.employee
    ADD CONSTRAINT employee_personid_fkey FOREIGN KEY (personid) REFERENCES person.person(personid);


--
-- Name: patientrelative patientrelative_pid_fkey; Type: FK CONSTRAINT; Schema: patientadministration; Owner: postgres
--

ALTER TABLE ONLY patientadministration.patientrelative
    ADD CONSTRAINT patientrelative_pid_fkey FOREIGN KEY (pid) REFERENCES patientadministration.patient(pid);


--
-- Name: product product_productsubcategoryid_fkey; Type: FK CONSTRAINT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.product
    ADD CONSTRAINT product_productsubcategoryid_fkey FOREIGN KEY (productsubcategoryid) REFERENCES production.productsubcategory(productsubcategoryid);


--
-- Name: productsubcategory productsubcategory_productcategoryid_fkey; Type: FK CONSTRAINT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.productsubcategory
    ADD CONSTRAINT productsubcategory_productcategoryid_fkey FOREIGN KEY (productcategoryid) REFERENCES production.productcategory(productcategoryid);


--
-- Name: servicerequest servicerequest_patid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicerequest
    ADD CONSTRAINT servicerequest_patid_fkey FOREIGN KEY (patid) REFERENCES public.patient(id);


--
-- Name: transactions transactions_accountid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_accountid_fkey FOREIGN KEY (accountid) REFERENCES public.bankaccounts(accountid);


--
-- Name: customer customer_personid_fkey; Type: FK CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.customer
    ADD CONSTRAINT customer_personid_fkey FOREIGN KEY (personid) REFERENCES person.person(personid);


--
-- Name: customer customer_territoryid_fkey; Type: FK CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.customer
    ADD CONSTRAINT customer_territoryid_fkey FOREIGN KEY (territoryid) REFERENCES sales.territory(territoryid);


--
-- Name: salesorderdetail salesorderdetail_productid_fkey; Type: FK CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.salesorderdetail
    ADD CONSTRAINT salesorderdetail_productid_fkey FOREIGN KEY (productid) REFERENCES production.product(productid);


--
-- Name: salesorderdetail salesorderdetail_salesorderheaderid_fkey; Type: FK CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.salesorderdetail
    ADD CONSTRAINT salesorderdetail_salesorderheaderid_fkey FOREIGN KEY (salesorderheaderid) REFERENCES sales.salesorderheader(salesorderheaderid);


--
-- Name: salesorderheader salesorderheader_customerid_fkey; Type: FK CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.salesorderheader
    ADD CONSTRAINT salesorderheader_customerid_fkey FOREIGN KEY (customerid) REFERENCES sales.customer(customerid);


--
-- Name: salesorderheader salesorderheader_employeeid_fkey; Type: FK CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.salesorderheader
    ADD CONSTRAINT salesorderheader_employeeid_fkey FOREIGN KEY (employeeid) REFERENCES humanresources.employee(employeeid);


--
-- Name: territory territory_countryid_fkey; Type: FK CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.territory
    ADD CONSTRAINT territory_countryid_fkey FOREIGN KEY (countryid) REFERENCES sales.country(countryid);


--
-- PostgreSQL database dump complete
--

