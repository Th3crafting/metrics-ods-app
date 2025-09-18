--
-- PostgreSQL database dump
--

\restrict W830kiI5GaSKKZeJRzFeWveQQ0ahYMRuXtlbsgnKT6ZnLKRe21Vrc48k2PdZQua

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

-- Started on 2025-09-18 12:32:17

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 16856)
-- Name: grnd; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA grnd;


ALTER SCHEMA grnd OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16857)
-- Name: entidades_externas; Type: TABLE; Schema: grnd; Owner: postgres
--

CREATE TABLE grnd.entidades_externas (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    contacto character varying,
    telefono character varying
);


ALTER TABLE grnd.entidades_externas OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16862)
-- Name: entidades_externas_id_seq; Type: SEQUENCE; Schema: grnd; Owner: postgres
--

CREATE SEQUENCE grnd.entidades_externas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE grnd.entidades_externas_id_seq OWNER TO postgres;

--
-- TOC entry 4957 (class 0 OID 0)
-- Dependencies: 218
-- Name: entidades_externas_id_seq; Type: SEQUENCE OWNED BY; Schema: grnd; Owner: postgres
--

ALTER SEQUENCE grnd.entidades_externas_id_seq OWNED BY grnd.entidades_externas.id;


--
-- TOC entry 219 (class 1259 OID 16863)
-- Name: estados; Type: TABLE; Schema: grnd; Owner: postgres
--

CREATE TABLE grnd.estados (
    id integer NOT NULL,
    nombre character varying NOT NULL
);


ALTER TABLE grnd.estados OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16868)
-- Name: estados_id_seq; Type: SEQUENCE; Schema: grnd; Owner: postgres
--

CREATE SEQUENCE grnd.estados_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE grnd.estados_id_seq OWNER TO postgres;

--
-- TOC entry 4958 (class 0 OID 0)
-- Dependencies: 220
-- Name: estados_id_seq; Type: SEQUENCE OWNED BY; Schema: grnd; Owner: postgres
--

ALTER SEQUENCE grnd.estados_id_seq OWNED BY grnd.estados.id;


--
-- TOC entry 221 (class 1259 OID 16869)
-- Name: localidades; Type: TABLE; Schema: grnd; Owner: postgres
--

CREATE TABLE grnd.localidades (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    sector_id integer
);


ALTER TABLE grnd.localidades OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16874)
-- Name: localidades_id_seq; Type: SEQUENCE; Schema: grnd; Owner: postgres
--

CREATE SEQUENCE grnd.localidades_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE grnd.localidades_id_seq OWNER TO postgres;

--
-- TOC entry 4959 (class 0 OID 0)
-- Dependencies: 222
-- Name: localidades_id_seq; Type: SEQUENCE OWNED BY; Schema: grnd; Owner: postgres
--

ALTER SEQUENCE grnd.localidades_id_seq OWNED BY grnd.localidades.id;


--
-- TOC entry 223 (class 1259 OID 16875)
-- Name: moderador_sector; Type: TABLE; Schema: grnd; Owner: postgres
--

CREATE TABLE grnd.moderador_sector (
    moderador_id integer NOT NULL,
    sector_id integer NOT NULL
);


ALTER TABLE grnd.moderador_sector OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16878)
-- Name: moderadores; Type: TABLE; Schema: grnd; Owner: postgres
--

CREATE TABLE grnd.moderadores (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    "isAdmin" boolean DEFAULT false NOT NULL
);


ALTER TABLE grnd.moderadores OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16883)
-- Name: moderadores_id_seq; Type: SEQUENCE; Schema: grnd; Owner: postgres
--

CREATE SEQUENCE grnd.moderadores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE grnd.moderadores_id_seq OWNER TO postgres;

--
-- TOC entry 4960 (class 0 OID 0)
-- Dependencies: 225
-- Name: moderadores_id_seq; Type: SEQUENCE OWNED BY; Schema: grnd; Owner: postgres
--

ALTER SEQUENCE grnd.moderadores_id_seq OWNED BY grnd.moderadores.id;


--
-- TOC entry 226 (class 1259 OID 16884)
-- Name: nivel_incidencia; Type: TABLE; Schema: grnd; Owner: postgres
--

CREATE TABLE grnd.nivel_incidencia (
    id integer NOT NULL,
    nivel integer NOT NULL,
    descripcion character varying
);


ALTER TABLE grnd.nivel_incidencia OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16889)
-- Name: nivel_incidencia_id_seq; Type: SEQUENCE; Schema: grnd; Owner: postgres
--

CREATE SEQUENCE grnd.nivel_incidencia_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE grnd.nivel_incidencia_id_seq OWNER TO postgres;

--
-- TOC entry 4961 (class 0 OID 0)
-- Dependencies: 227
-- Name: nivel_incidencia_id_seq; Type: SEQUENCE OWNED BY; Schema: grnd; Owner: postgres
--

ALTER SEQUENCE grnd.nivel_incidencia_id_seq OWNED BY grnd.nivel_incidencia.id;


--
-- TOC entry 228 (class 1259 OID 16890)
-- Name: reportes; Type: TABLE; Schema: grnd; Owner: postgres
--

CREATE TABLE grnd.reportes (
    id integer NOT NULL,
    descripcion text,
    fecha timestamp without time zone DEFAULT now() NOT NULL,
    entidad_externa_id integer,
    titulo character varying(100) NOT NULL,
    direccion character varying,
    "usuarioId" integer,
    "tipoReporteId" integer,
    "sectorId" integer,
    "estadoId" integer,
    "nivelIncidenciaId" integer
);


ALTER TABLE grnd.reportes OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16896)
-- Name: reportes_id_seq; Type: SEQUENCE; Schema: grnd; Owner: postgres
--

CREATE SEQUENCE grnd.reportes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE grnd.reportes_id_seq OWNER TO postgres;

--
-- TOC entry 4962 (class 0 OID 0)
-- Dependencies: 229
-- Name: reportes_id_seq; Type: SEQUENCE OWNED BY; Schema: grnd; Owner: postgres
--

ALTER SEQUENCE grnd.reportes_id_seq OWNED BY grnd.reportes.id;


--
-- TOC entry 230 (class 1259 OID 16900)
-- Name: sectores; Type: TABLE; Schema: grnd; Owner: postgres
--

CREATE TABLE grnd.sectores (
    id integer NOT NULL,
    nombre character varying NOT NULL
);


ALTER TABLE grnd.sectores OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16905)
-- Name: sectores_id_seq; Type: SEQUENCE; Schema: grnd; Owner: postgres
--

CREATE SEQUENCE grnd.sectores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE grnd.sectores_id_seq OWNER TO postgres;

--
-- TOC entry 4963 (class 0 OID 0)
-- Dependencies: 231
-- Name: sectores_id_seq; Type: SEQUENCE OWNED BY; Schema: grnd; Owner: postgres
--

ALTER SEQUENCE grnd.sectores_id_seq OWNED BY grnd.sectores.id;


--
-- TOC entry 232 (class 1259 OID 16906)
-- Name: tipos_reportes; Type: TABLE; Schema: grnd; Owner: postgres
--

CREATE TABLE grnd.tipos_reportes (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    descripcion character varying
);


ALTER TABLE grnd.tipos_reportes OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16911)
-- Name: tipos_reportes_id_seq; Type: SEQUENCE; Schema: grnd; Owner: postgres
--

CREATE SEQUENCE grnd.tipos_reportes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE grnd.tipos_reportes_id_seq OWNER TO postgres;

--
-- TOC entry 4964 (class 0 OID 0)
-- Dependencies: 233
-- Name: tipos_reportes_id_seq; Type: SEQUENCE OWNED BY; Schema: grnd; Owner: postgres
--

ALTER SEQUENCE grnd.tipos_reportes_id_seq OWNED BY grnd.tipos_reportes.id;


--
-- TOC entry 234 (class 1259 OID 16912)
-- Name: usuarios; Type: TABLE; Schema: grnd; Owner: postgres
--

CREATE TABLE grnd.usuarios (
    id integer NOT NULL,
    localidad_id integer,
    nombre character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    direccion character varying NOT NULL
);


ALTER TABLE grnd.usuarios OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 16917)
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: grnd; Owner: postgres
--

CREATE SEQUENCE grnd.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE grnd.usuarios_id_seq OWNER TO postgres;

--
-- TOC entry 4965 (class 0 OID 0)
-- Dependencies: 235
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: grnd; Owner: postgres
--

ALTER SEQUENCE grnd.usuarios_id_seq OWNED BY grnd.usuarios.id;


--
-- TOC entry 4739 (class 2604 OID 16918)
-- Name: entidades_externas id; Type: DEFAULT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.entidades_externas ALTER COLUMN id SET DEFAULT nextval('grnd.entidades_externas_id_seq'::regclass);


--
-- TOC entry 4740 (class 2604 OID 16919)
-- Name: estados id; Type: DEFAULT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.estados ALTER COLUMN id SET DEFAULT nextval('grnd.estados_id_seq'::regclass);


--
-- TOC entry 4741 (class 2604 OID 16920)
-- Name: localidades id; Type: DEFAULT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.localidades ALTER COLUMN id SET DEFAULT nextval('grnd.localidades_id_seq'::regclass);


--
-- TOC entry 4742 (class 2604 OID 16921)
-- Name: moderadores id; Type: DEFAULT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.moderadores ALTER COLUMN id SET DEFAULT nextval('grnd.moderadores_id_seq'::regclass);


--
-- TOC entry 4744 (class 2604 OID 16922)
-- Name: nivel_incidencia id; Type: DEFAULT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.nivel_incidencia ALTER COLUMN id SET DEFAULT nextval('grnd.nivel_incidencia_id_seq'::regclass);


--
-- TOC entry 4745 (class 2604 OID 16923)
-- Name: reportes id; Type: DEFAULT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.reportes ALTER COLUMN id SET DEFAULT nextval('grnd.reportes_id_seq'::regclass);


--
-- TOC entry 4747 (class 2604 OID 16924)
-- Name: sectores id; Type: DEFAULT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.sectores ALTER COLUMN id SET DEFAULT nextval('grnd.sectores_id_seq'::regclass);


--
-- TOC entry 4748 (class 2604 OID 16925)
-- Name: tipos_reportes id; Type: DEFAULT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.tipos_reportes ALTER COLUMN id SET DEFAULT nextval('grnd.tipos_reportes_id_seq'::regclass);


--
-- TOC entry 4749 (class 2604 OID 16926)
-- Name: usuarios id; Type: DEFAULT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.usuarios ALTER COLUMN id SET DEFAULT nextval('grnd.usuarios_id_seq'::regclass);


--
-- TOC entry 4933 (class 0 OID 16857)
-- Dependencies: 217
-- Data for Name: entidades_externas; Type: TABLE DATA; Schema: grnd; Owner: postgres
--

COPY grnd.entidades_externas (id, nombre, contacto, telefono) FROM stdin;
1	Secretaría de Ambiente	contacto@ambiente.gov	3000000001
2	Empresa de Acueducto	contacto@acueducto.com	3000000002
3	Policía Ambiental	contacto@policiaambiental.gov	3000000003
4	Alcaldía Local	contacto@alcaldia.gov	3000000004
5	Cuerpo de Bomberos	contacto@bomberos.gov	3000000005
6	Defensa Civil	contacto@defensacivil.org	3000000006
\.


--
-- TOC entry 4935 (class 0 OID 16863)
-- Dependencies: 219
-- Data for Name: estados; Type: TABLE DATA; Schema: grnd; Owner: postgres
--

COPY grnd.estados (id, nombre) FROM stdin;
1	Abierto
2	Pendiente
3	En Revisión
4	Cerrado
5	Rechazado
\.


--
-- TOC entry 4937 (class 0 OID 16869)
-- Dependencies: 221
-- Data for Name: localidades; Type: TABLE DATA; Schema: grnd; Owner: postgres
--

COPY grnd.localidades (id, nombre, sector_id) FROM stdin;
1	Usaquén	1
11	Suba	1
3	Santa Fe	2
12	Barrios Unidos	2
13	Teusaquillo	2
14	Los Mártires	2
17	La Candelaria	2
5	Usme	3
6	Tunjuelito	3
7	Bosa	3
18	Rafael Uribe Uribe	3
19	Ciudad Bolívar	3
20	Sumapaz	3
8	Kennedy	4
9	Fontibón	4
10	Engativá	4
16	Puente Aranda	4
2	Chapinero	5
4	San Cristóbal	5
15	Antonio Nariño	5
\.


--
-- TOC entry 4939 (class 0 OID 16875)
-- Dependencies: 223
-- Data for Name: moderador_sector; Type: TABLE DATA; Schema: grnd; Owner: postgres
--

COPY grnd.moderador_sector (moderador_id, sector_id) FROM stdin;
1	1
1	2
1	3
1	4
1	5
2	1
3	2
2	3
3	4
2	5
\.


--
-- TOC entry 4940 (class 0 OID 16878)
-- Dependencies: 224
-- Data for Name: moderadores; Type: TABLE DATA; Schema: grnd; Owner: postgres
--

COPY grnd.moderadores (id, nombre, email, password, "isAdmin") FROM stdin;
2	Sara Otero	sotero@gmail.com	$2b$12$Dmhm3MKG1wCBvhADhKdAO..yVguIVjUVdkDIGV7j9nbacBRh/MTce	f
3	Julian Moreno	jmoreno@prueba.com	$2b$12$GcvPzWHfqTlwitQE25PcIerH31iezy3N5vTnuOpk1p/CxnysQzDTy	f
1	Dillan Real	drealnieto@gmail.com	$2b$12$g7EcKX5w9rMjiEcuzVWZB.UDw4eoj0RycbAmG4wD.HENsrV31Ybwi	t
\.


--
-- TOC entry 4942 (class 0 OID 16884)
-- Dependencies: 226
-- Data for Name: nivel_incidencia; Type: TABLE DATA; Schema: grnd; Owner: postgres
--

COPY grnd.nivel_incidencia (id, nivel, descripcion) FROM stdin;
1	1	Bajo
2	2	Medio
3	3	Alto
\.


--
-- TOC entry 4944 (class 0 OID 16890)
-- Dependencies: 228
-- Data for Name: reportes; Type: TABLE DATA; Schema: grnd; Owner: postgres
--

COPY grnd.reportes (id, descripcion, fecha, entidad_externa_id, titulo, direccion, "usuarioId", "tipoReporteId", "sectorId", "estadoId", "nivelIncidenciaId") FROM stdin;
21	Bolsas acumuladas desde el fin de semana	2025-09-16 22:41:58.231994	1	Basura frente al parque	Cra 15 # 120-25	1	2	2	5	2
20	Ruido por discoteca sin permisos	2025-09-15 23:42:42.825639	\N	Discoteca ilegal	Zona Rosa Bogotá	1	5	2	3	2
19	Basura y escombros en vía	2025-09-15 23:42:42.825639	\N	Escombros abandonados	Calle 72 con Caracas	3	2	2	2	2
18	Tala de árboles en zona protegida	2025-09-15 23:42:42.825639	\N	Tala en ronda hídrica	Parque Entrenubes	2	4	5	1	3
17	Fuga en acueducto barrio Kennedy	2025-09-15 23:42:42.825639	\N	Fuga de agua	Barrio Kennedy Central	1	3	4	4	3
16	Obras con maquinaria generando ruido	2025-09-15 23:42:42.825639	\N	Ruido diurno	Av. Jiménez con 7ma	3	5	4	1	1
15	Basura en quebrada	2025-09-15 23:42:42.825639	\N	Contaminación hídrica	Quebrada Limas	2	2	2	2	2
14	Ruido excesivo en zona residencial	2025-09-15 23:42:42.825639	\N	Ruido nocturno	Calle 127 con Av. 19	1	5	1	3	1
13	Tala ilegal de árboles	2025-09-15 23:42:42.825639	\N	Corte de árboles no autorizado	Carrera 10 con Calle 20	3	4	3	2	2
11	Basura acumulada en parque principal	2025-09-15 23:42:42.825639	\N	Acumulación de basura	Parque central Usaquén	1	2	1	1	2
22	Discoteca ruidosa cerca de mi casa	2025-09-17 00:24:10.462539	\N	Ruido - Calle 78 Sur	Calle 78 Sur	1	5	1	1	2
23	Tala ilegal de árboles	2025-09-18 02:05:27.88784	\N	Tala - Calle 53 #12-62	Calle 53 #12-62	1	4	3	1	3
\.


--
-- TOC entry 4946 (class 0 OID 16900)
-- Dependencies: 230
-- Data for Name: sectores; Type: TABLE DATA; Schema: grnd; Owner: postgres
--

COPY grnd.sectores (id, nombre) FROM stdin;
1	Sector Norte
2	Sector Centro
3	Sector Sur
4	Sector Occidente
5	Sector Oriente
\.


--
-- TOC entry 4948 (class 0 OID 16906)
-- Dependencies: 232
-- Data for Name: tipos_reportes; Type: TABLE DATA; Schema: grnd; Owner: postgres
--

COPY grnd.tipos_reportes (id, nombre, descripcion) FROM stdin;
2	Basura	Descripción pendiente
3	Fugas	Descripción pendiente
4	Tala	Descripción pendiente
5	Ruido	Descripción pendiente
6	Otros	Descripción pendiente
\.


--
-- TOC entry 4950 (class 0 OID 16912)
-- Dependencies: 234
-- Data for Name: usuarios; Type: TABLE DATA; Schema: grnd; Owner: postgres
--

COPY grnd.usuarios (id, localidad_id, nombre, email, password, direccion) FROM stdin;
3	11	Julian Moreno	jmoreno@prueba.com	$2b$12$GcvPzWHfqTlwitQE25PcIerH31iezy3N5vTnuOpk1p/CxnysQzDTy	Calle 987 Sur #123-55
5	1	Usuario Prueba	test@test.com	$2b$12$HxZiXQ1cmEhVVFizcFrQXeB/DtIoIe7KssEgf/lSVcseh.RcQdrEy	Calle Falsa 123
4	13	Esteban	estebitan@gmail.com	$2b$12$JcoABHWPAjIqWdXi6BiZpuSY31C7fkCFTyuAzZbAc.dGKqsijVPk.	Calle 53
1	7	Dillan Real	drealnieto@gmail.com	$2b$12$g7EcKX5w9rMjiEcuzVWZB.UDw4eoj0RycbAmG4wD.HENsrV31Ybwi	Calle 78 Sur
2	5	Sara Otero	sotero@gmail.com	Administrador1234!	Calle 123 # 654
\.


--
-- TOC entry 4966 (class 0 OID 0)
-- Dependencies: 218
-- Name: entidades_externas_id_seq; Type: SEQUENCE SET; Schema: grnd; Owner: postgres
--

SELECT pg_catalog.setval('grnd.entidades_externas_id_seq', 6, true);


--
-- TOC entry 4967 (class 0 OID 0)
-- Dependencies: 220
-- Name: estados_id_seq; Type: SEQUENCE SET; Schema: grnd; Owner: postgres
--

SELECT pg_catalog.setval('grnd.estados_id_seq', 5, true);


--
-- TOC entry 4968 (class 0 OID 0)
-- Dependencies: 222
-- Name: localidades_id_seq; Type: SEQUENCE SET; Schema: grnd; Owner: postgres
--

SELECT pg_catalog.setval('grnd.localidades_id_seq', 1, false);


--
-- TOC entry 4969 (class 0 OID 0)
-- Dependencies: 225
-- Name: moderadores_id_seq; Type: SEQUENCE SET; Schema: grnd; Owner: postgres
--

SELECT pg_catalog.setval('grnd.moderadores_id_seq', 3, true);


--
-- TOC entry 4970 (class 0 OID 0)
-- Dependencies: 227
-- Name: nivel_incidencia_id_seq; Type: SEQUENCE SET; Schema: grnd; Owner: postgres
--

SELECT pg_catalog.setval('grnd.nivel_incidencia_id_seq', 3, true);


--
-- TOC entry 4971 (class 0 OID 0)
-- Dependencies: 229
-- Name: reportes_id_seq; Type: SEQUENCE SET; Schema: grnd; Owner: postgres
--

SELECT pg_catalog.setval('grnd.reportes_id_seq', 23, true);


--
-- TOC entry 4972 (class 0 OID 0)
-- Dependencies: 231
-- Name: sectores_id_seq; Type: SEQUENCE SET; Schema: grnd; Owner: postgres
--

SELECT pg_catalog.setval('grnd.sectores_id_seq', 5, true);


--
-- TOC entry 4973 (class 0 OID 0)
-- Dependencies: 233
-- Name: tipos_reportes_id_seq; Type: SEQUENCE SET; Schema: grnd; Owner: postgres
--

SELECT pg_catalog.setval('grnd.tipos_reportes_id_seq', 6, true);


--
-- TOC entry 4974 (class 0 OID 0)
-- Dependencies: 235
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: grnd; Owner: postgres
--

SELECT pg_catalog.setval('grnd.usuarios_id_seq', 5, true);


--
-- TOC entry 4751 (class 2606 OID 16928)
-- Name: entidades_externas entidades_externas_pkey; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.entidades_externas
    ADD CONSTRAINT entidades_externas_pkey PRIMARY KEY (id);


--
-- TOC entry 4753 (class 2606 OID 16930)
-- Name: estados estados_pkey; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.estados
    ADD CONSTRAINT estados_pkey PRIMARY KEY (id);


--
-- TOC entry 4755 (class 2606 OID 16932)
-- Name: localidades localidades_pkey; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.localidades
    ADD CONSTRAINT localidades_pkey PRIMARY KEY (id);


--
-- TOC entry 4759 (class 2606 OID 16934)
-- Name: moderador_sector moderador_sector_pk; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.moderador_sector
    ADD CONSTRAINT moderador_sector_pk PRIMARY KEY (moderador_id, sector_id);


--
-- TOC entry 4761 (class 2606 OID 16936)
-- Name: moderadores moderadores_email_key; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.moderadores
    ADD CONSTRAINT moderadores_email_key UNIQUE (email);


--
-- TOC entry 4763 (class 2606 OID 16938)
-- Name: moderadores moderadores_email_uk; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.moderadores
    ADD CONSTRAINT moderadores_email_uk UNIQUE (email);


--
-- TOC entry 4765 (class 2606 OID 16940)
-- Name: moderadores moderadores_pkey; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.moderadores
    ADD CONSTRAINT moderadores_pkey PRIMARY KEY (id);


--
-- TOC entry 4767 (class 2606 OID 16942)
-- Name: nivel_incidencia nivel_incidencia_pkey; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.nivel_incidencia
    ADD CONSTRAINT nivel_incidencia_pkey PRIMARY KEY (id);


--
-- TOC entry 4769 (class 2606 OID 16944)
-- Name: reportes reportes_pkey; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.reportes
    ADD CONSTRAINT reportes_pkey PRIMARY KEY (id);


--
-- TOC entry 4771 (class 2606 OID 16948)
-- Name: sectores sectores_pkey; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.sectores
    ADD CONSTRAINT sectores_pkey PRIMARY KEY (id);


--
-- TOC entry 4773 (class 2606 OID 16950)
-- Name: tipos_reportes tipos_reportes_pkey; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.tipos_reportes
    ADD CONSTRAINT tipos_reportes_pkey PRIMARY KEY (id);


--
-- TOC entry 4775 (class 2606 OID 16952)
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- TOC entry 4777 (class 2606 OID 16954)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- TOC entry 4756 (class 1259 OID 17030)
-- Name: IDX_681f81c01645399049e6e15fef; Type: INDEX; Schema: grnd; Owner: postgres
--

CREATE INDEX "IDX_681f81c01645399049e6e15fef" ON grnd.moderador_sector USING btree (sector_id);


--
-- TOC entry 4757 (class 1259 OID 17029)
-- Name: IDX_f194f5d9084a050e699c82593e; Type: INDEX; Schema: grnd; Owner: postgres
--

CREATE INDEX "IDX_f194f5d9084a050e699c82593e" ON grnd.moderador_sector USING btree (moderador_id);


--
-- TOC entry 4781 (class 2606 OID 16958)
-- Name: reportes FK_0133a02f6c44ee667565d9e2170; Type: FK CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.reportes
    ADD CONSTRAINT "FK_0133a02f6c44ee667565d9e2170" FOREIGN KEY ("usuarioId") REFERENCES grnd.usuarios(id);


--
-- TOC entry 4782 (class 2606 OID 16963)
-- Name: reportes FK_2ae1b5c9642c262f65629c3174a; Type: FK CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.reportes
    ADD CONSTRAINT "FK_2ae1b5c9642c262f65629c3174a" FOREIGN KEY ("tipoReporteId") REFERENCES grnd.tipos_reportes(id);


--
-- TOC entry 4783 (class 2606 OID 16968)
-- Name: reportes FK_56c224dac3bbbe85a94ed429551; Type: FK CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.reportes
    ADD CONSTRAINT "FK_56c224dac3bbbe85a94ed429551" FOREIGN KEY ("sectorId") REFERENCES grnd.sectores(id);


--
-- TOC entry 4779 (class 2606 OID 17036)
-- Name: moderador_sector FK_681f81c01645399049e6e15fef8; Type: FK CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.moderador_sector
    ADD CONSTRAINT "FK_681f81c01645399049e6e15fef8" FOREIGN KEY (sector_id) REFERENCES grnd.sectores(id);


--
-- TOC entry 4784 (class 2606 OID 16973)
-- Name: reportes FK_9f5a7760297e1c8250297ec0ee2; Type: FK CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.reportes
    ADD CONSTRAINT "FK_9f5a7760297e1c8250297ec0ee2" FOREIGN KEY (entidad_externa_id) REFERENCES grnd.entidades_externas(id);


--
-- TOC entry 4785 (class 2606 OID 16983)
-- Name: reportes FK_b89ed963e02b4950b308726e4cf; Type: FK CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.reportes
    ADD CONSTRAINT "FK_b89ed963e02b4950b308726e4cf" FOREIGN KEY ("estadoId") REFERENCES grnd.estados(id);


--
-- TOC entry 4778 (class 2606 OID 17024)
-- Name: localidades FK_ca3fa94f624c61db91f82fa3668; Type: FK CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.localidades
    ADD CONSTRAINT "FK_ca3fa94f624c61db91f82fa3668" FOREIGN KEY (sector_id) REFERENCES grnd.sectores(id);


--
-- TOC entry 4787 (class 2606 OID 16988)
-- Name: usuarios FK_ccd816326d8b5e1d61b31fbe33b; Type: FK CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.usuarios
    ADD CONSTRAINT "FK_ccd816326d8b5e1d61b31fbe33b" FOREIGN KEY (localidad_id) REFERENCES grnd.localidades(id);


--
-- TOC entry 4786 (class 2606 OID 16993)
-- Name: reportes FK_d4d2a97fde820000214e06510e5; Type: FK CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.reportes
    ADD CONSTRAINT "FK_d4d2a97fde820000214e06510e5" FOREIGN KEY ("nivelIncidenciaId") REFERENCES grnd.nivel_incidencia(id);


--
-- TOC entry 4780 (class 2606 OID 17031)
-- Name: moderador_sector FK_f194f5d9084a050e699c82593eb; Type: FK CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.moderador_sector
    ADD CONSTRAINT "FK_f194f5d9084a050e699c82593eb" FOREIGN KEY (moderador_id) REFERENCES grnd.moderadores(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2025-09-18 12:32:17

--
-- PostgreSQL database dump complete
--

\unrestrict W830kiI5GaSKKZeJRzFeWveQQ0ahYMRuXtlbsgnKT6ZnLKRe21Vrc48k2PdZQua

