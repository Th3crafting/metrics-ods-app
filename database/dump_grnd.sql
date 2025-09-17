--
-- PostgreSQL database dump
--

\restrict EtRSoqwSuFelxcxaJeKJwUeu0RcSPdwxDvjyF5c7uoernawLfYjm4Sr3gmxFjrg

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

-- Started on 2025-09-16 17:01:39

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
-- TOC entry 5 (class 2615 OID 16682)
-- Name: grnd; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA grnd;


ALTER SCHEMA grnd OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16683)
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
-- TOC entry 218 (class 1259 OID 16688)
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
-- TOC entry 4966 (class 0 OID 0)
-- Dependencies: 218
-- Name: entidades_externas_id_seq; Type: SEQUENCE OWNED BY; Schema: grnd; Owner: postgres
--

ALTER SEQUENCE grnd.entidades_externas_id_seq OWNED BY grnd.entidades_externas.id;


--
-- TOC entry 219 (class 1259 OID 16689)
-- Name: estados; Type: TABLE; Schema: grnd; Owner: postgres
--

CREATE TABLE grnd.estados (
    id integer NOT NULL,
    nombre character varying NOT NULL
);


ALTER TABLE grnd.estados OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16694)
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
-- TOC entry 4967 (class 0 OID 0)
-- Dependencies: 220
-- Name: estados_id_seq; Type: SEQUENCE OWNED BY; Schema: grnd; Owner: postgres
--

ALTER SEQUENCE grnd.estados_id_seq OWNED BY grnd.estados.id;


--
-- TOC entry 221 (class 1259 OID 16695)
-- Name: localidades; Type: TABLE; Schema: grnd; Owner: postgres
--

CREATE TABLE grnd.localidades (
    id integer NOT NULL,
    nombre character varying NOT NULL
);


ALTER TABLE grnd.localidades OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16700)
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
-- TOC entry 4968 (class 0 OID 0)
-- Dependencies: 222
-- Name: localidades_id_seq; Type: SEQUENCE OWNED BY; Schema: grnd; Owner: postgres
--

ALTER SEQUENCE grnd.localidades_id_seq OWNED BY grnd.localidades.id;


--
-- TOC entry 223 (class 1259 OID 16701)
-- Name: moderador_sector; Type: TABLE; Schema: grnd; Owner: postgres
--

CREATE TABLE grnd.moderador_sector (
    moderador_id integer NOT NULL,
    sector_id integer NOT NULL
);


ALTER TABLE grnd.moderador_sector OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16704)
-- Name: moderadores; Type: TABLE; Schema: grnd; Owner: postgres
--

CREATE TABLE grnd.moderadores (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL
);


ALTER TABLE grnd.moderadores OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16709)
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
-- TOC entry 4969 (class 0 OID 0)
-- Dependencies: 225
-- Name: moderadores_id_seq; Type: SEQUENCE OWNED BY; Schema: grnd; Owner: postgres
--

ALTER SEQUENCE grnd.moderadores_id_seq OWNED BY grnd.moderadores.id;


--
-- TOC entry 226 (class 1259 OID 16710)
-- Name: nivel_incidencia; Type: TABLE; Schema: grnd; Owner: postgres
--

CREATE TABLE grnd.nivel_incidencia (
    id integer NOT NULL,
    nivel integer NOT NULL,
    descripcion character varying NOT NULL
);


ALTER TABLE grnd.nivel_incidencia OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16715)
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
-- TOC entry 4970 (class 0 OID 0)
-- Dependencies: 227
-- Name: nivel_incidencia_id_seq; Type: SEQUENCE OWNED BY; Schema: grnd; Owner: postgres
--

ALTER SEQUENCE grnd.nivel_incidencia_id_seq OWNED BY grnd.nivel_incidencia.id;


--
-- TOC entry 228 (class 1259 OID 16716)
-- Name: reportes; Type: TABLE; Schema: grnd; Owner: postgres
--

CREATE TABLE grnd.reportes (
    id integer NOT NULL,
    descripcion text NOT NULL,
    fecha timestamp without time zone DEFAULT now() NOT NULL,
    entidad_externa_id integer,
    titulo character varying(100) NOT NULL,
    latitud numeric(10,6),
    longitud numeric(10,6),
    direccion character varying,
    "usuarioId" integer,
    "tipoReporteId" integer,
    "sectorId" integer,
    "estadoId" integer,
    "nivelIncidenciaId" integer
);


ALTER TABLE grnd.reportes OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16722)
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
-- TOC entry 4971 (class 0 OID 0)
-- Dependencies: 229
-- Name: reportes_id_seq; Type: SEQUENCE OWNED BY; Schema: grnd; Owner: postgres
--

ALTER SEQUENCE grnd.reportes_id_seq OWNED BY grnd.reportes.id;


--
-- TOC entry 230 (class 1259 OID 16723)
-- Name: sector_localidad; Type: TABLE; Schema: grnd; Owner: postgres
--

CREATE TABLE grnd.sector_localidad (
    sector_id integer NOT NULL,
    localidad_id integer NOT NULL
);


ALTER TABLE grnd.sector_localidad OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16726)
-- Name: sectores; Type: TABLE; Schema: grnd; Owner: postgres
--

CREATE TABLE grnd.sectores (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    "localidadId" integer
);


ALTER TABLE grnd.sectores OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 16731)
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
-- TOC entry 4972 (class 0 OID 0)
-- Dependencies: 232
-- Name: sectores_id_seq; Type: SEQUENCE OWNED BY; Schema: grnd; Owner: postgres
--

ALTER SEQUENCE grnd.sectores_id_seq OWNED BY grnd.sectores.id;


--
-- TOC entry 233 (class 1259 OID 16732)
-- Name: tipos_reportes; Type: TABLE; Schema: grnd; Owner: postgres
--

CREATE TABLE grnd.tipos_reportes (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    descripcion character varying NOT NULL
);


ALTER TABLE grnd.tipos_reportes OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 16737)
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
-- TOC entry 4973 (class 0 OID 0)
-- Dependencies: 234
-- Name: tipos_reportes_id_seq; Type: SEQUENCE OWNED BY; Schema: grnd; Owner: postgres
--

ALTER SEQUENCE grnd.tipos_reportes_id_seq OWNED BY grnd.tipos_reportes.id;


--
-- TOC entry 235 (class 1259 OID 16738)
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
-- TOC entry 236 (class 1259 OID 16743)
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
-- TOC entry 4974 (class 0 OID 0)
-- Dependencies: 236
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: grnd; Owner: postgres
--

ALTER SEQUENCE grnd.usuarios_id_seq OWNED BY grnd.usuarios.id;


--
-- TOC entry 4743 (class 2604 OID 16744)
-- Name: entidades_externas id; Type: DEFAULT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.entidades_externas ALTER COLUMN id SET DEFAULT nextval('grnd.entidades_externas_id_seq'::regclass);


--
-- TOC entry 4744 (class 2604 OID 16745)
-- Name: estados id; Type: DEFAULT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.estados ALTER COLUMN id SET DEFAULT nextval('grnd.estados_id_seq'::regclass);


--
-- TOC entry 4745 (class 2604 OID 16746)
-- Name: localidades id; Type: DEFAULT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.localidades ALTER COLUMN id SET DEFAULT nextval('grnd.localidades_id_seq'::regclass);


--
-- TOC entry 4746 (class 2604 OID 16747)
-- Name: moderadores id; Type: DEFAULT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.moderadores ALTER COLUMN id SET DEFAULT nextval('grnd.moderadores_id_seq'::regclass);


--
-- TOC entry 4747 (class 2604 OID 16748)
-- Name: nivel_incidencia id; Type: DEFAULT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.nivel_incidencia ALTER COLUMN id SET DEFAULT nextval('grnd.nivel_incidencia_id_seq'::regclass);


--
-- TOC entry 4748 (class 2604 OID 16749)
-- Name: reportes id; Type: DEFAULT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.reportes ALTER COLUMN id SET DEFAULT nextval('grnd.reportes_id_seq'::regclass);


--
-- TOC entry 4750 (class 2604 OID 16750)
-- Name: sectores id; Type: DEFAULT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.sectores ALTER COLUMN id SET DEFAULT nextval('grnd.sectores_id_seq'::regclass);


--
-- TOC entry 4751 (class 2604 OID 16751)
-- Name: tipos_reportes id; Type: DEFAULT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.tipos_reportes ALTER COLUMN id SET DEFAULT nextval('grnd.tipos_reportes_id_seq'::regclass);


--
-- TOC entry 4752 (class 2604 OID 16752)
-- Name: usuarios id; Type: DEFAULT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.usuarios ALTER COLUMN id SET DEFAULT nextval('grnd.usuarios_id_seq'::regclass);


--
-- TOC entry 4941 (class 0 OID 16683)
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
-- TOC entry 4943 (class 0 OID 16689)
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
-- TOC entry 4945 (class 0 OID 16695)
-- Dependencies: 221
-- Data for Name: localidades; Type: TABLE DATA; Schema: grnd; Owner: postgres
--

COPY grnd.localidades (id, nombre) FROM stdin;
1	Usaquén
2	Chapinero
3	Santa Fe
4	San Cristóbal
5	Usme
6	Tunjuelito
7	Bosa
8	Kennedy
9	Fontibón
10	Engativá
11	Suba
12	Barrios Unidos
13	Teusaquillo
14	Los Mártires
15	Antonio Nariño
16	Puente Aranda
17	La Candelaria
18	Rafael Uribe Uribe
19	Ciudad Bolívar
20	Sumapaz
\.


--
-- TOC entry 4947 (class 0 OID 16701)
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
-- TOC entry 4948 (class 0 OID 16704)
-- Dependencies: 224
-- Data for Name: moderadores; Type: TABLE DATA; Schema: grnd; Owner: postgres
--

COPY grnd.moderadores (id, nombre, email, password) FROM stdin;
1	Dillan Real	drealnieto@gmail.com	$2b$12$g7EcKX5w9rMjiEcuzVWZB.UDw4eoj0RycbAmG4wD.HENsrV31Ybwi
2	Sara Otero	sotero@gmail.com	$2b$12$Dmhm3MKG1wCBvhADhKdAO..yVguIVjUVdkDIGV7j9nbacBRh/MTce
3	Julian Moreno	jmoreno@prueba.com	$2b$12$GcvPzWHfqTlwitQE25PcIerH31iezy3N5vTnuOpk1p/CxnysQzDTy
\.


--
-- TOC entry 4950 (class 0 OID 16710)
-- Dependencies: 226
-- Data for Name: nivel_incidencia; Type: TABLE DATA; Schema: grnd; Owner: postgres
--

COPY grnd.nivel_incidencia (id, nivel, descripcion) FROM stdin;
1	1	Bajo
2	2	Medio
3	3	Alto
\.


--
-- TOC entry 4952 (class 0 OID 16716)
-- Dependencies: 228
-- Data for Name: reportes; Type: TABLE DATA; Schema: grnd; Owner: postgres
--

COPY grnd.reportes (id, descripcion, fecha, entidad_externa_id, titulo, latitud, longitud, direccion, "usuarioId", "tipoReporteId", "sectorId", "estadoId", "nivelIncidenciaId") FROM stdin;
11	Basura acumulada en parque principal	2025-09-15 23:42:42.825639	1	Acumulación de basura	4.711000	-74.072100	Parque central Usaquén	1	2	1	1	2
12	Fuga de agua en vía pública	2025-09-15 23:42:42.825639	2	Fuga en hidrante	4.652200	-74.108500	Calle 45 con Av. Caracas	2	3	2	1	3
13	Tala ilegal de árboles	2025-09-15 23:42:42.825639	3	Corte de árboles no autorizado	4.609700	-74.081700	Carrera 10 con Calle 20	3	4	3	2	2
14	Ruido excesivo en zona residencial	2025-09-15 23:42:42.825639	4	Ruido nocturno	4.679600	-74.042100	Calle 127 con Av. 19	1	5	1	3	1
15	Basura en quebrada	2025-09-15 23:42:42.825639	1	Contaminación hídrica	4.548200	-74.118500	Quebrada Limas	2	2	2	2	2
16	Obras con maquinaria generando ruido	2025-09-15 23:42:42.825639	4	Ruido diurno	4.634200	-74.082200	Av. Jiménez con 7ma	3	5	4	1	1
17	Fuga en acueducto barrio Kennedy	2025-09-15 23:42:42.825639	2	Fuga de agua	4.624500	-74.142100	Barrio Kennedy Central	1	3	4	4	3
18	Tala de árboles en zona protegida	2025-09-15 23:42:42.825639	3	Tala en ronda hídrica	4.555000	-74.120000	Parque Entrenubes	2	4	5	1	3
19	Basura y escombros en vía	2025-09-15 23:42:42.825639	5	Escombros abandonados	4.622500	-74.070100	Calle 72 con Caracas	3	2	2	2	2
20	Ruido por discoteca sin permisos	2025-09-15 23:42:42.825639	4	Discoteca ilegal	4.656000	-74.093000	Zona Rosa Bogotá	1	5	2	3	2
\.


--
-- TOC entry 4954 (class 0 OID 16723)
-- Dependencies: 230
-- Data for Name: sector_localidad; Type: TABLE DATA; Schema: grnd; Owner: postgres
--

COPY grnd.sector_localidad (sector_id, localidad_id) FROM stdin;
1	1
1	11
2	3
2	12
2	13
2	14
2	17
3	5
3	6
3	7
3	18
3	19
3	20
4	8
4	9
4	10
4	16
5	2
5	4
5	15
\.


--
-- TOC entry 4955 (class 0 OID 16726)
-- Dependencies: 231
-- Data for Name: sectores; Type: TABLE DATA; Schema: grnd; Owner: postgres
--

COPY grnd.sectores (id, nombre, "localidadId") FROM stdin;
1	Sector Norte	\N
2	Sector Centro	\N
3	Sector Sur	\N
4	Sector Occidente	\N
5	Sector Oriente	\N
\.


--
-- TOC entry 4957 (class 0 OID 16732)
-- Dependencies: 233
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
-- TOC entry 4959 (class 0 OID 16738)
-- Dependencies: 235
-- Data for Name: usuarios; Type: TABLE DATA; Schema: grnd; Owner: postgres
--

COPY grnd.usuarios (id, localidad_id, nombre, email, password, direccion) FROM stdin;
1	7	Dillan	drealnieto@gmail.com	$2b$12$g7EcKX5w9rMjiEcuzVWZB.UDw4eoj0RycbAmG4wD.HENsrV31Ybwi	Calle 78 Sur
2	5	Sara	sotero@gmail.com	$2b$12$Dmhm3MKG1wCBvhADhKdAO..yVguIVjUVdkDIGV7j9nbacBRh/MTce	Calle 123 # 654
3	11	Julian Moreno	jmoreno@prueba.com	$2b$12$GcvPzWHfqTlwitQE25PcIerH31iezy3N5vTnuOpk1p/CxnysQzDTy	Calle 987 Sur #123-55
5	1	Usuario Prueba	test@test.com	$2b$12$HxZiXQ1cmEhVVFizcFrQXeB/DtIoIe7KssEgf/lSVcseh.RcQdrEy	Calle Falsa 123
4	13	Esteban	estebitan@gmail.com	$2b$12$JcoABHWPAjIqWdXi6BiZpuSY31C7fkCFTyuAzZbAc.dGKqsijVPk.	Calle 53
\.


--
-- TOC entry 4975 (class 0 OID 0)
-- Dependencies: 218
-- Name: entidades_externas_id_seq; Type: SEQUENCE SET; Schema: grnd; Owner: postgres
--

SELECT pg_catalog.setval('grnd.entidades_externas_id_seq', 6, true);


--
-- TOC entry 4976 (class 0 OID 0)
-- Dependencies: 220
-- Name: estados_id_seq; Type: SEQUENCE SET; Schema: grnd; Owner: postgres
--

SELECT pg_catalog.setval('grnd.estados_id_seq', 5, true);


--
-- TOC entry 4977 (class 0 OID 0)
-- Dependencies: 222
-- Name: localidades_id_seq; Type: SEQUENCE SET; Schema: grnd; Owner: postgres
--

SELECT pg_catalog.setval('grnd.localidades_id_seq', 1, false);


--
-- TOC entry 4978 (class 0 OID 0)
-- Dependencies: 225
-- Name: moderadores_id_seq; Type: SEQUENCE SET; Schema: grnd; Owner: postgres
--

SELECT pg_catalog.setval('grnd.moderadores_id_seq', 3, true);


--
-- TOC entry 4979 (class 0 OID 0)
-- Dependencies: 227
-- Name: nivel_incidencia_id_seq; Type: SEQUENCE SET; Schema: grnd; Owner: postgres
--

SELECT pg_catalog.setval('grnd.nivel_incidencia_id_seq', 3, true);


--
-- TOC entry 4980 (class 0 OID 0)
-- Dependencies: 229
-- Name: reportes_id_seq; Type: SEQUENCE SET; Schema: grnd; Owner: postgres
--

SELECT pg_catalog.setval('grnd.reportes_id_seq', 20, true);


--
-- TOC entry 4981 (class 0 OID 0)
-- Dependencies: 232
-- Name: sectores_id_seq; Type: SEQUENCE SET; Schema: grnd; Owner: postgres
--

SELECT pg_catalog.setval('grnd.sectores_id_seq', 5, true);


--
-- TOC entry 4982 (class 0 OID 0)
-- Dependencies: 234
-- Name: tipos_reportes_id_seq; Type: SEQUENCE SET; Schema: grnd; Owner: postgres
--

SELECT pg_catalog.setval('grnd.tipos_reportes_id_seq', 6, true);


--
-- TOC entry 4983 (class 0 OID 0)
-- Dependencies: 236
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: grnd; Owner: postgres
--

SELECT pg_catalog.setval('grnd.usuarios_id_seq', 5, true);


--
-- TOC entry 4754 (class 2606 OID 16754)
-- Name: entidades_externas entidades_externas_pkey; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.entidades_externas
    ADD CONSTRAINT entidades_externas_pkey PRIMARY KEY (id);


--
-- TOC entry 4756 (class 2606 OID 16756)
-- Name: estados estados_pkey; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.estados
    ADD CONSTRAINT estados_pkey PRIMARY KEY (id);


--
-- TOC entry 4758 (class 2606 OID 16758)
-- Name: localidades localidades_pkey; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.localidades
    ADD CONSTRAINT localidades_pkey PRIMARY KEY (id);


--
-- TOC entry 4762 (class 2606 OID 16760)
-- Name: moderador_sector moderador_sector_pk; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.moderador_sector
    ADD CONSTRAINT moderador_sector_pk PRIMARY KEY (moderador_id, sector_id);


--
-- TOC entry 4764 (class 2606 OID 16762)
-- Name: moderadores moderadores_email_key; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.moderadores
    ADD CONSTRAINT moderadores_email_key UNIQUE (email);


--
-- TOC entry 4766 (class 2606 OID 16764)
-- Name: moderadores moderadores_email_uk; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.moderadores
    ADD CONSTRAINT moderadores_email_uk UNIQUE (email);


--
-- TOC entry 4768 (class 2606 OID 16766)
-- Name: moderadores moderadores_pkey; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.moderadores
    ADD CONSTRAINT moderadores_pkey PRIMARY KEY (id);


--
-- TOC entry 4770 (class 2606 OID 16768)
-- Name: nivel_incidencia nivel_incidencia_pkey; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.nivel_incidencia
    ADD CONSTRAINT nivel_incidencia_pkey PRIMARY KEY (id);


--
-- TOC entry 4772 (class 2606 OID 16770)
-- Name: reportes reportes_pkey; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.reportes
    ADD CONSTRAINT reportes_pkey PRIMARY KEY (id);


--
-- TOC entry 4775 (class 2606 OID 16772)
-- Name: sector_localidad sector_localidad_pk; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.sector_localidad
    ADD CONSTRAINT sector_localidad_pk PRIMARY KEY (sector_id, localidad_id);


--
-- TOC entry 4777 (class 2606 OID 16774)
-- Name: sectores sectores_pkey; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.sectores
    ADD CONSTRAINT sectores_pkey PRIMARY KEY (id);


--
-- TOC entry 4779 (class 2606 OID 16776)
-- Name: tipos_reportes tipos_reportes_pkey; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.tipos_reportes
    ADD CONSTRAINT tipos_reportes_pkey PRIMARY KEY (id);


--
-- TOC entry 4781 (class 2606 OID 16778)
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- TOC entry 4783 (class 2606 OID 16780)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- TOC entry 4759 (class 1259 OID 16781)
-- Name: idx_moderador_sector_moderador; Type: INDEX; Schema: grnd; Owner: postgres
--

CREATE INDEX idx_moderador_sector_moderador ON grnd.moderador_sector USING btree (moderador_id);


--
-- TOC entry 4760 (class 1259 OID 16782)
-- Name: idx_moderador_sector_sector; Type: INDEX; Schema: grnd; Owner: postgres
--

CREATE INDEX idx_moderador_sector_sector ON grnd.moderador_sector USING btree (sector_id);


--
-- TOC entry 4773 (class 1259 OID 16783)
-- Name: idx_sector_localidad_localidad; Type: INDEX; Schema: grnd; Owner: postgres
--

CREATE INDEX idx_sector_localidad_localidad ON grnd.sector_localidad USING btree (localidad_id);


--
-- TOC entry 4786 (class 2606 OID 16784)
-- Name: reportes FK_0133a02f6c44ee667565d9e2170; Type: FK CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.reportes
    ADD CONSTRAINT "FK_0133a02f6c44ee667565d9e2170" FOREIGN KEY ("usuarioId") REFERENCES grnd.usuarios(id);


--
-- TOC entry 4787 (class 2606 OID 16789)
-- Name: reportes FK_2ae1b5c9642c262f65629c3174a; Type: FK CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.reportes
    ADD CONSTRAINT "FK_2ae1b5c9642c262f65629c3174a" FOREIGN KEY ("tipoReporteId") REFERENCES grnd.tipos_reportes(id);


--
-- TOC entry 4788 (class 2606 OID 16794)
-- Name: reportes FK_56c224dac3bbbe85a94ed429551; Type: FK CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.reportes
    ADD CONSTRAINT "FK_56c224dac3bbbe85a94ed429551" FOREIGN KEY ("sectorId") REFERENCES grnd.sectores(id);


--
-- TOC entry 4789 (class 2606 OID 16799)
-- Name: reportes FK_9f5a7760297e1c8250297ec0ee2; Type: FK CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.reportes
    ADD CONSTRAINT "FK_9f5a7760297e1c8250297ec0ee2" FOREIGN KEY (entidad_externa_id) REFERENCES grnd.entidades_externas(id);


--
-- TOC entry 4794 (class 2606 OID 16804)
-- Name: sectores FK_b2a8da7882877dc0e3fe32c509e; Type: FK CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.sectores
    ADD CONSTRAINT "FK_b2a8da7882877dc0e3fe32c509e" FOREIGN KEY ("localidadId") REFERENCES grnd.localidades(id);


--
-- TOC entry 4790 (class 2606 OID 16809)
-- Name: reportes FK_b89ed963e02b4950b308726e4cf; Type: FK CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.reportes
    ADD CONSTRAINT "FK_b89ed963e02b4950b308726e4cf" FOREIGN KEY ("estadoId") REFERENCES grnd.estados(id);


--
-- TOC entry 4795 (class 2606 OID 16814)
-- Name: usuarios FK_ccd816326d8b5e1d61b31fbe33b; Type: FK CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.usuarios
    ADD CONSTRAINT "FK_ccd816326d8b5e1d61b31fbe33b" FOREIGN KEY (localidad_id) REFERENCES grnd.localidades(id);


--
-- TOC entry 4791 (class 2606 OID 16819)
-- Name: reportes FK_d4d2a97fde820000214e06510e5; Type: FK CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.reportes
    ADD CONSTRAINT "FK_d4d2a97fde820000214e06510e5" FOREIGN KEY ("nivelIncidenciaId") REFERENCES grnd.nivel_incidencia(id);


--
-- TOC entry 4784 (class 2606 OID 16824)
-- Name: moderador_sector moderador_sector_moderador_fk; Type: FK CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.moderador_sector
    ADD CONSTRAINT moderador_sector_moderador_fk FOREIGN KEY (moderador_id) REFERENCES grnd.moderadores(id) ON DELETE CASCADE;


--
-- TOC entry 4785 (class 2606 OID 16829)
-- Name: moderador_sector moderador_sector_sector_fk; Type: FK CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.moderador_sector
    ADD CONSTRAINT moderador_sector_sector_fk FOREIGN KEY (sector_id) REFERENCES grnd.sectores(id) ON DELETE CASCADE;


--
-- TOC entry 4792 (class 2606 OID 16834)
-- Name: sector_localidad sector_localidad_localidad_fk; Type: FK CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.sector_localidad
    ADD CONSTRAINT sector_localidad_localidad_fk FOREIGN KEY (localidad_id) REFERENCES grnd.localidades(id) ON DELETE RESTRICT;


--
-- TOC entry 4793 (class 2606 OID 16839)
-- Name: sector_localidad sector_localidad_sector_fk; Type: FK CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.sector_localidad
    ADD CONSTRAINT sector_localidad_sector_fk FOREIGN KEY (sector_id) REFERENCES grnd.sectores(id) ON DELETE CASCADE;


-- Completed on 2025-09-16 17:01:39

--
-- PostgreSQL database dump complete
--

\unrestrict EtRSoqwSuFelxcxaJeKJwUeu0RcSPdwxDvjyF5c7uoernawLfYjm4Sr3gmxFjrg

