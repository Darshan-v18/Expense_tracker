--
-- PostgreSQL database dump
--

-- Dumped from database version 14.13 (Ubuntu 14.13-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.13 (Ubuntu 14.13-0ubuntu0.22.04.1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Budgets; Type: TABLE; Schema: public; Owner: expense_user
--

CREATE TABLE public."Budgets" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "categoryId" integer NOT NULL,
    amount double precision NOT NULL,
    month character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Budgets" OWNER TO expense_user;

--
-- Name: Budgets_id_seq; Type: SEQUENCE; Schema: public; Owner: expense_user
--

CREATE SEQUENCE public."Budgets_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Budgets_id_seq" OWNER TO expense_user;

--
-- Name: Budgets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: expense_user
--

ALTER SEQUENCE public."Budgets_id_seq" OWNED BY public."Budgets".id;


--
-- Name: Categories; Type: TABLE; Schema: public; Owner: expense_user
--

CREATE TABLE public."Categories" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Categories" OWNER TO expense_user;

--
-- Name: Categories_id_seq; Type: SEQUENCE; Schema: public; Owner: expense_user
--

CREATE SEQUENCE public."Categories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Categories_id_seq" OWNER TO expense_user;

--
-- Name: Categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: expense_user
--

ALTER SEQUENCE public."Categories_id_seq" OWNED BY public."Categories".id;


--
-- Name: Expenses; Type: TABLE; Schema: public; Owner: expense_user
--

CREATE TABLE public."Expenses" (
    id integer NOT NULL,
    description character varying(255) NOT NULL,
    amount double precision NOT NULL,
    receipt character varying(255),
    "userId" integer NOT NULL,
    "categoryId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    date date NOT NULL
);


ALTER TABLE public."Expenses" OWNER TO expense_user;

--
-- Name: Expenses_id_seq; Type: SEQUENCE; Schema: public; Owner: expense_user
--

CREATE SEQUENCE public."Expenses_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Expenses_id_seq" OWNER TO expense_user;

--
-- Name: Expenses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: expense_user
--

ALTER SEQUENCE public."Expenses_id_seq" OWNED BY public."Expenses".id;


--
-- Name: Otps; Type: TABLE; Schema: public; Owner: expense_user
--

CREATE TABLE public."Otps" (
    id integer NOT NULL,
    otp character varying(255) NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Otps" OWNER TO expense_user;

--
-- Name: Otps_id_seq; Type: SEQUENCE; Schema: public; Owner: expense_user
--

CREATE SEQUENCE public."Otps_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Otps_id_seq" OWNER TO expense_user;

--
-- Name: Otps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: expense_user
--

ALTER SEQUENCE public."Otps_id_seq" OWNED BY public."Otps".id;


--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: expense_user
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO expense_user;

--
-- Name: Users; Type: TABLE; Schema: public; Owner: expense_user
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Users" OWNER TO expense_user;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: expense_user
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_id_seq" OWNER TO expense_user;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: expense_user
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: Budgets id; Type: DEFAULT; Schema: public; Owner: expense_user
--

ALTER TABLE ONLY public."Budgets" ALTER COLUMN id SET DEFAULT nextval('public."Budgets_id_seq"'::regclass);


--
-- Name: Categories id; Type: DEFAULT; Schema: public; Owner: expense_user
--

ALTER TABLE ONLY public."Categories" ALTER COLUMN id SET DEFAULT nextval('public."Categories_id_seq"'::regclass);


--
-- Name: Expenses id; Type: DEFAULT; Schema: public; Owner: expense_user
--

ALTER TABLE ONLY public."Expenses" ALTER COLUMN id SET DEFAULT nextval('public."Expenses_id_seq"'::regclass);


--
-- Name: Otps id; Type: DEFAULT; Schema: public; Owner: expense_user
--

ALTER TABLE ONLY public."Otps" ALTER COLUMN id SET DEFAULT nextval('public."Otps_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: expense_user
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Data for Name: Budgets; Type: TABLE DATA; Schema: public; Owner: expense_user
--

COPY public."Budgets" (id, "userId", "categoryId", amount, month, "createdAt", "updatedAt") FROM stdin;
3	7	1	2500	2024-10	2024-10-01 11:55:40.051+05:30	2024-10-03 10:45:19.259+05:30
6	7	2	1500	2024-10	2024-10-03 12:47:49.818+05:30	2024-10-03 12:47:49.818+05:30
9	7	3	5000	2024-09	2024-10-03 16:07:51.544+05:30	2024-10-03 16:07:51.544+05:30
14	7	3	7000	2024-10	2024-10-04 17:24:15.387+05:30	2024-10-04 17:24:15.387+05:30
15	7	1	1500	2024-09	2024-10-04 17:26:47.917+05:30	2024-10-04 17:26:47.917+05:30
16	7	2	5000	2024-09	2024-10-04 17:36:30.087+05:30	2024-10-04 17:36:30.087+05:30
17	7	1	5000	2024-08	2024-10-04 17:37:15.284+05:30	2024-10-04 17:37:15.284+05:30
18	7	2	3500	2024-08	2024-10-04 17:37:28.14+05:30	2024-10-04 17:37:28.14+05:30
19	7	3	4500	2024-08	2024-10-04 17:37:41.638+05:30	2024-10-04 17:37:41.638+05:30
20	7	4	1220	2024-10	2024-10-07 16:35:29.326+05:30	2024-10-07 16:35:29.326+05:30
\.


--
-- Data for Name: Categories; Type: TABLE DATA; Schema: public; Owner: expense_user
--

COPY public."Categories" (id, name, "createdAt", "updatedAt") FROM stdin;
1	Food	2024-09-26 16:46:18.551+05:30	2024-09-26 16:46:18.551+05:30
2	Entertainment	2024-09-26 17:36:11.612+05:30	2024-09-26 17:36:11.612+05:30
3	Travel	2024-10-03 16:02:51.41+05:30	2024-10-03 16:02:51.41+05:30
4	Clothes	2024-10-07 16:35:10.555+05:30	2024-10-07 16:35:10.555+05:30
\.


--
-- Data for Name: Expenses; Type: TABLE DATA; Schema: public; Owner: expense_user
--

COPY public."Expenses" (id, description, amount, receipt, "userId", "categoryId", "createdAt", "updatedAt", date) FROM stdin;
29	Brunch	200		7	1	2024-10-04 17:01:36.548+05:30	2024-10-04 17:02:16.47+05:30	2024-08-29
30	Trip	3000		7	3	2024-10-04 17:06:25.386+05:30	2024-10-04 17:06:25.386+05:30	2024-10-02
31	Movie	500		7	2	2024-10-04 17:15:08.34+05:30	2024-10-04 17:15:08.34+05:30	2024-10-03
32	Dinner	120		7	1	2024-10-04 17:22:07.749+05:30	2024-10-04 17:22:07.749+05:30	2024-10-02
33	Hiking	2000		7	3	2024-10-04 17:26:20.304+05:30	2024-10-04 17:26:20.304+05:30	2024-09-13
34	Lunch	280		7	1	2024-10-04 17:27:18.69+05:30	2024-10-04 17:27:18.69+05:30	2024-09-20
35	Party	3500		7	2	2024-10-04 17:36:52.541+05:30	2024-10-04 17:36:52.541+05:30	2024-09-28
36	Outing	580		7	3	2024-10-04 17:39:09.436+05:30	2024-10-04 17:39:09.436+05:30	2024-08-23
37	Games	900		7	2	2024-10-04 17:39:47.856+05:30	2024-10-04 17:39:47.856+05:30	2024-08-15
38	Onlin shopping	700		7	4	2024-10-07 16:36:04.58+05:30	2024-10-07 16:36:04.58+05:30	2024-10-04
39	food	520		7	1	2024-10-07 16:55:03.924+05:30	2024-10-07 16:55:03.924+05:30	2024-07-24
40	travel	850		7	3	2024-10-07 16:55:32.638+05:30	2024-10-07 16:55:32.638+05:30	2024-06-19
\.


--
-- Data for Name: Otps; Type: TABLE DATA; Schema: public; Owner: expense_user
--

COPY public."Otps" (id, otp, "userId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: expense_user
--

COPY public."SequelizeMeta" (name) FROM stdin;
20240926094633-create-users-table.js
20240926095049-create-categories-table.js
20240926095150-create-expenses-table.js
20240926095326-create-otps-table.js
20240926113913-create-budgets-table.js
20241004112424-add-date-to-expense.js
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: expense_user
--

COPY public."Users" (id, name, email, password, "createdAt", "updatedAt") FROM stdin;
7	darshan	dv18mar@gmail.com	$2a$10$7G9IFg0U32JPbX3u.f5QV.cUD1Ziogiz8mKpo7Xo.xPvBY9WRyhyG	2024-09-30 17:30:42.347+05:30	2024-10-01 11:37:06.197+05:30
\.


--
-- Name: Budgets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: expense_user
--

SELECT pg_catalog.setval('public."Budgets_id_seq"', 20, true);


--
-- Name: Categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: expense_user
--

SELECT pg_catalog.setval('public."Categories_id_seq"', 4, true);


--
-- Name: Expenses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: expense_user
--

SELECT pg_catalog.setval('public."Expenses_id_seq"', 40, true);


--
-- Name: Otps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: expense_user
--

SELECT pg_catalog.setval('public."Otps_id_seq"', 15, true);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: expense_user
--

SELECT pg_catalog.setval('public."Users_id_seq"', 7, true);


--
-- Name: Budgets Budgets_pkey; Type: CONSTRAINT; Schema: public; Owner: expense_user
--

ALTER TABLE ONLY public."Budgets"
    ADD CONSTRAINT "Budgets_pkey" PRIMARY KEY (id);


--
-- Name: Categories Categories_name_key; Type: CONSTRAINT; Schema: public; Owner: expense_user
--

ALTER TABLE ONLY public."Categories"
    ADD CONSTRAINT "Categories_name_key" UNIQUE (name);


--
-- Name: Categories Categories_pkey; Type: CONSTRAINT; Schema: public; Owner: expense_user
--

ALTER TABLE ONLY public."Categories"
    ADD CONSTRAINT "Categories_pkey" PRIMARY KEY (id);


--
-- Name: Expenses Expenses_pkey; Type: CONSTRAINT; Schema: public; Owner: expense_user
--

ALTER TABLE ONLY public."Expenses"
    ADD CONSTRAINT "Expenses_pkey" PRIMARY KEY (id);


--
-- Name: Otps Otps_pkey; Type: CONSTRAINT; Schema: public; Owner: expense_user
--

ALTER TABLE ONLY public."Otps"
    ADD CONSTRAINT "Otps_pkey" PRIMARY KEY (id);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: expense_user
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: Users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: expense_user
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: expense_user
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: Budgets Budgets_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: expense_user
--

ALTER TABLE ONLY public."Budgets"
    ADD CONSTRAINT "Budgets_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Categories"(id) ON UPDATE CASCADE;


--
-- Name: Budgets Budgets_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: expense_user
--

ALTER TABLE ONLY public."Budgets"
    ADD CONSTRAINT "Budgets_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE;


--
-- Name: Expenses Expenses_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: expense_user
--

ALTER TABLE ONLY public."Expenses"
    ADD CONSTRAINT "Expenses_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Categories"(id) ON DELETE SET NULL;


--
-- Name: Expenses Expenses_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: expense_user
--

ALTER TABLE ONLY public."Expenses"
    ADD CONSTRAINT "Expenses_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: Otps Otps_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: expense_user
--

ALTER TABLE ONLY public."Otps"
    ADD CONSTRAINT "Otps_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

