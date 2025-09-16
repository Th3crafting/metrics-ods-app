--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-09-16 15:49:30

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
-- TOC entry 5 (class 2615 OID 17106)
-- Name: grnd; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA grnd;


ALTER SCHEMA grnd OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 17107)
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
-- TOC entry 218 (class 1259 OID 17112)
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
-- TOC entry 5013 (class 0 OID 0)
-- Dependencies: 218
-- Name: entidades_externas_id_seq; Type: SEQUENCE OWNED BY; Schema: grnd; Owner: postgres
--

ALTER SEQUENCE grnd.entidades_externas_id_seq OWNED BY grnd.entidades_externas.id;


--
-- TOC entry 219 (class 1259 OID 17113)
-- Name: estados; Type: TABLE; Schema: grnd; Owner: postgres
--

CREATE TABLE grnd.estados (
    id integer NOT NULL,
    nombre character varying NOT NULL
);


ALTER TABLE grnd.estados OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 17118)
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
-- TOC entry 5014 (class 0 OID 0)
-- Dependencies: 220
-- Name: estados_id_seq; Type: SEQUENCE OWNED BY; Schema: grnd; Owner: postgres
--

ALTER SEQUENCE grnd.estados_id_seq OWNED BY grnd.estados.id;


--
-- TOC entry 221 (class 1259 OID 17119)
-- Name: localidades; Type: TABLE; Schema: grnd; Owner: postgres
--

CREATE TABLE grnd.localidades (
    id integer NOT NULL,
    nombre character varying NOT NULL
);


ALTER TABLE grnd.localidades OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 17124)
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
-- TOC entry 5015 (class 0 OID 0)
-- Dependencies: 222
-- Name: localidades_id_seq; Type: SEQUENCE OWNED BY; Schema: grnd; Owner: postgres
--

ALTER SEQUENCE grnd.localidades_id_seq OWNED BY grnd.localidades.id;


--
-- TOC entry 223 (class 1259 OID 17125)
-- Name: moderador_sector; Type: TABLE; Schema: grnd; Owner: postgres
--

CREATE TABLE grnd.moderador_sector (
    moderador_id integer NOT NULL,
    sector_id integer NOT NULL
);


ALTER TABLE grnd.moderador_sector OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 17128)
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
-- TOC entry 225 (class 1259 OID 17133)
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
-- TOC entry 5016 (class 0 OID 0)
-- Dependencies: 225
-- Name: moderadores_id_seq; Type: SEQUENCE OWNED BY; Schema: grnd; Owner: postgres
--

ALTER SEQUENCE grnd.moderadores_id_seq OWNED BY grnd.moderadores.id;


--
-- TOC entry 226 (class 1259 OID 17134)
-- Name: nivel_incidencia; Type: TABLE; Schema: grnd; Owner: postgres
--

CREATE TABLE grnd.nivel_incidencia (
    id integer NOT NULL,
    nivel integer NOT NULL,
    descripcion character varying NOT NULL
);


ALTER TABLE grnd.nivel_incidencia OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 17139)
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
-- TOC entry 5017 (class 0 OID 0)
-- Dependencies: 227
-- Name: nivel_incidencia_id_seq; Type: SEQUENCE OWNED BY; Schema: grnd; Owner: postgres
--

ALTER SEQUENCE grnd.nivel_incidencia_id_seq OWNED BY grnd.nivel_incidencia.id;


--
-- TOC entry 228 (class 1259 OID 17140)
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
-- TOC entry 229 (class 1259 OID 17146)
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
-- TOC entry 5018 (class 0 OID 0)
-- Dependencies: 229
-- Name: reportes_id_seq; Type: SEQUENCE OWNED BY; Schema: grnd; Owner: postgres
--

ALTER SEQUENCE grnd.reportes_id_seq OWNED BY grnd.reportes.id;


--
-- TOC entry 230 (class 1259 OID 17147)
-- Name: sector_localidad; Type: TABLE; Schema: grnd; Owner: postgres
--

CREATE TABLE grnd.sector_localidad (
    sector_id integer NOT NULL,
    localidad_id integer NOT NULL
);


ALTER TABLE grnd.sector_localidad OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 17150)
-- Name: sectores; Type: TABLE; Schema: grnd; Owner: postgres
--

CREATE TABLE grnd.sectores (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    "localidadId" integer
);


ALTER TABLE grnd.sectores OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 17155)
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
-- TOC entry 5019 (class 0 OID 0)
-- Dependencies: 232
-- Name: sectores_id_seq; Type: SEQUENCE OWNED BY; Schema: grnd; Owner: postgres
--

ALTER SEQUENCE grnd.sectores_id_seq OWNED BY grnd.sectores.id;


--
-- TOC entry 233 (class 1259 OID 17156)
-- Name: tipos_reportes; Type: TABLE; Schema: grnd; Owner: postgres
--

CREATE TABLE grnd.tipos_reportes (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    descripcion character varying NOT NULL
);


ALTER TABLE grnd.tipos_reportes OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 17161)
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
-- TOC entry 5020 (class 0 OID 0)
-- Dependencies: 234
-- Name: tipos_reportes_id_seq; Type: SEQUENCE OWNED BY; Schema: grnd; Owner: postgres
--

ALTER SEQUENCE grnd.tipos_reportes_id_seq OWNED BY grnd.tipos_reportes.id;


--
-- TOC entry 235 (class 1259 OID 17162)
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
-- TOC entry 236 (class 1259 OID 17167)
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
-- TOC entry 5021 (class 0 OID 0)
-- Dependencies: 236
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: grnd; Owner: postgres
--

ALTER SEQUENCE grnd.usuarios_id_seq OWNED BY grnd.usuarios.id;


--
-- TOC entry 4790 (class 2604 OID 17168)
-- Name: entidades_externas id; Type: DEFAULT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.entidades_externas ALTER COLUMN id SET DEFAULT nextval('grnd.entidades_externas_id_seq'::regclass);


--
-- TOC entry 4791 (class 2604 OID 17169)
-- Name: estados id; Type: DEFAULT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.estados ALTER COLUMN id SET DEFAULT nextval('grnd.estados_id_seq'::regclass);


--
-- TOC entry 4792 (class 2604 OID 17170)
-- Name: localidades id; Type: DEFAULT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.localidades ALTER COLUMN id SET DEFAULT nextval('grnd.localidades_id_seq'::regclass);


--
-- TOC entry 4793 (class 2604 OID 17171)
-- Name: moderadores id; Type: DEFAULT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.moderadores ALTER COLUMN id SET DEFAULT nextval('grnd.moderadores_id_seq'::regclass);


--
-- TOC entry 4794 (class 2604 OID 17172)
-- Name: nivel_incidencia id; Type: DEFAULT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.nivel_incidencia ALTER COLUMN id SET DEFAULT nextval('grnd.nivel_incidencia_id_seq'::regclass);


--
-- TOC entry 4795 (class 2604 OID 17173)
-- Name: reportes id; Type: DEFAULT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.reportes ALTER COLUMN id SET DEFAULT nextval('grnd.reportes_id_seq'::regclass);


--
-- TOC entry 4797 (class 2604 OID 17174)
-- Name: sectores id; Type: DEFAULT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.sectores ALTER COLUMN id SET DEFAULT nextval('grnd.sectores_id_seq'::regclass);


--
-- TOC entry 4798 (class 2604 OID 17175)
-- Name: tipos_reportes id; Type: DEFAULT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.tipos_reportes ALTER COLUMN id SET DEFAULT nextval('grnd.tipos_reportes_id_seq'::regclass);


--
-- TOC entry 4799 (class 2604 OID 17176)
-- Name: usuarios id; Type: DEFAULT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.usuarios ALTER COLUMN id SET DEFAULT nextval('grnd.usuarios_id_seq'::regclass);


--
-- TOC entry 4988 (class 0 OID 17107)
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
-- TOC entry 4990 (class 0 OID 17113)
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
-- TOC entry 4992 (class 0 OID 17119)
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
-- TOC entry 4994 (class 0 OID 17125)
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
-- TOC entry 4995 (class 0 OID 17128)
-- Dependencies: 224
-- Data for Name: moderadores; Type: TABLE DATA; Schema: grnd; Owner: postgres
--

COPY grnd.moderadores (id, nombre, email, password) FROM stdin;
1	Dillan Real	drealnieto@gmail.com	$2b$12$g7EcKX5w9rMjiEcuzVWZB.UDw4eoj0RycbAmG4wD.HENsrV31Ybwi
2	Sara Otero	sotero@gmail.com	$2b$12$Dmhm3MKG1wCBvhADhKdAO..yVguIVjUVdkDIGV7j9nbacBRh/MTce
3	Julian Moreno	jmoreno@prueba.com	$2b$12$GcvPzWHfqTlwitQE25PcIerH31iezy3N5vTnuOpk1p/CxnysQzDTy
\.


--
-- TOC entry 4997 (class 0 OID 17134)
-- Dependencies: 226
-- Data for Name: nivel_incidencia; Type: TABLE DATA; Schema: grnd; Owner: postgres
--

COPY grnd.nivel_incidencia (id, nivel, descripcion) FROM stdin;
1	1	Bajo
2	2	Medio
3	3	Alto
\.


--
-- TOC entry 4999 (class 0 OID 17140)
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
-- TOC entry 5001 (class 0 OID 17147)
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
-- TOC entry 5002 (class 0 OID 17150)
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
-- TOC entry 5004 (class 0 OID 17156)
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
-- TOC entry 5006 (class 0 OID 17162)
-- Dependencies: 235
-- Data for Name: usuarios; Type: TABLE DATA; Schema: grnd; Owner: postgres
--

COPY grnd.usuarios (id, localidad_id, nombre, email, password, direccion) FROM stdin;
1	7	Dillan	drealnieto@gmail.com	$2b$12$g7EcKX5w9rMjiEcuzVWZB.UDw4eoj0RycbAmG4wD.HENsrV31Ybwi	Calle 78 Sur
2	5	Sara	sotero@gmail.com	$2b$12$Dmhm3MKG1wCBvhADhKdAO..yVguIVjUVdkDIGV7j9nbacBRh/MTce	Calle 123 # 654
3	11	Julian Moreno	jmoreno@prueba.com	$2b$12$GcvPzWHfqTlwitQE25PcIerH31iezy3N5vTnuOpk1p/CxnysQzDTy	Calle 987 Sur #123-55
4	13	Estebitan	estebitan@gmail.com	$2b$12$JcoABHWPAjIqWdXi6BiZpuSY31C7fkCFTyuAzZbAc.dGKqsijVPk.	Calle 53
\.


--
-- TOC entry 5022 (class 0 OID 0)
-- Dependencies: 218
-- Name: entidades_externas_id_seq; Type: SEQUENCE SET; Schema: grnd; Owner: postgres
--

SELECT pg_catalog.setval('grnd.entidades_externas_id_seq', 6, true);


--
-- TOC entry 5023 (class 0 OID 0)
-- Dependencies: 220
-- Name: estados_id_seq; Type: SEQUENCE SET; Schema: grnd; Owner: postgres
--

SELECT pg_catalog.setval('grnd.estados_id_seq', 5, true);


--
-- TOC entry 5024 (class 0 OID 0)
-- Dependencies: 222
-- Name: localidades_id_seq; Type: SEQUENCE SET; Schema: grnd; Owner: postgres
--

SELECT pg_catalog.setval('grnd.localidades_id_seq', 1, false);


--
-- TOC entry 5025 (class 0 OID 0)
-- Dependencies: 225
-- Name: moderadores_id_seq; Type: SEQUENCE SET; Schema: grnd; Owner: postgres
--

SELECT pg_catalog.setval('grnd.moderadores_id_seq', 3, true);


--
-- TOC entry 5026 (class 0 OID 0)
-- Dependencies: 227
-- Name: nivel_incidencia_id_seq; Type: SEQUENCE SET; Schema: grnd; Owner: postgres
--

SELECT pg_catalog.setval('grnd.nivel_incidencia_id_seq', 3, true);


--
-- TOC entry 5027 (class 0 OID 0)
-- Dependencies: 229
-- Name: reportes_id_seq; Type: SEQUENCE SET; Schema: grnd; Owner: postgres
--

SELECT pg_catalog.setval('grnd.reportes_id_seq', 20, true);


--
-- TOC entry 5028 (class 0 OID 0)
-- Dependencies: 232
-- Name: sectores_id_seq; Type: SEQUENCE SET; Schema: grnd; Owner: postgres
--

SELECT pg_catalog.setval('grnd.sectores_id_seq', 5, true);


--
-- TOC entry 5029 (class 0 OID 0)
-- Dependencies: 234
-- Name: tipos_reportes_id_seq; Type: SEQUENCE SET; Schema: grnd; Owner: postgres
--

SELECT pg_catalog.setval('grnd.tipos_reportes_id_seq', 6, true);


--
-- TOC entry 5030 (class 0 OID 0)
-- Dependencies: 236
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: grnd; Owner: postgres
--

SELECT pg_catalog.setval('grnd.usuarios_id_seq', 4, true);


--
-- TOC entry 4801 (class 2606 OID 17178)
-- Name: entidades_externas entidades_externas_pkey; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.entidades_externas
    ADD CONSTRAINT entidades_externas_pkey PRIMARY KEY (id);


--
-- TOC entry 4803 (class 2606 OID 17180)
-- Name: estados estados_pkey; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.estados
    ADD CONSTRAINT estados_pkey PRIMARY KEY (id);


--
-- TOC entry 4805 (class 2606 OID 17182)
-- Name: localidades localidades_pkey; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.localidades
    ADD CONSTRAINT localidades_pkey PRIMARY KEY (id);


--
-- TOC entry 4809 (class 2606 OID 17184)
-- Name: moderador_sector moderador_sector_pk; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.moderador_sector
    ADD CONSTRAINT moderador_sector_pk PRIMARY KEY (moderador_id, sector_id);


--
-- TOC entry 4811 (class 2606 OID 17186)
-- Name: moderadores moderadores_email_key; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.moderadores
    ADD CONSTRAINT moderadores_email_key UNIQUE (email);


--
-- TOC entry 4813 (class 2606 OID 17188)
-- Name: moderadores moderadores_email_uk; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.moderadores
    ADD CONSTRAINT moderadores_email_uk UNIQUE (email);


--
-- TOC entry 4815 (class 2606 OID 17190)
-- Name: moderadores moderadores_pkey; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.moderadores
    ADD CONSTRAINT moderadores_pkey PRIMARY KEY (id);


--
-- TOC entry 4817 (class 2606 OID 17192)
-- Name: nivel_incidencia nivel_incidencia_pkey; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.nivel_incidencia
    ADD CONSTRAINT nivel_incidencia_pkey PRIMARY KEY (id);


--
-- TOC entry 4819 (class 2606 OID 17194)
-- Name: reportes reportes_pkey; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.reportes
    ADD CONSTRAINT reportes_pkey PRIMARY KEY (id);


--
-- TOC entry 4822 (class 2606 OID 17196)
-- Name: sector_localidad sector_localidad_pk; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.sector_localidad
    ADD CONSTRAINT sector_localidad_pk PRIMARY KEY (sector_id, localidad_id);


--
-- TOC entry 4824 (class 2606 OID 17198)
-- Name: sectores sectores_pkey; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.sectores
    ADD CONSTRAINT sectores_pkey PRIMARY KEY (id);


--
-- TOC entry 4826 (class 2606 OID 17200)
-- Name: tipos_reportes tipos_reportes_pkey; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.tipos_reportes
    ADD CONSTRAINT tipos_reportes_pkey PRIMARY KEY (id);


--
-- TOC entry 4828 (class 2606 OID 17202)
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- TOC entry 4830 (class 2606 OID 17204)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- TOC entry 4806 (class 1259 OID 17205)
-- Name: idx_moderador_sector_moderador; Type: INDEX; Schema: grnd; Owner: postgres
--

CREATE INDEX idx_moderador_sector_moderador ON grnd.moderador_sector USING btree (moderador_id);


--
-- TOC entry 4807 (class 1259 OID 17206)
-- Name: idx_moderador_sector_sector; Type: INDEX; Schema: grnd; Owner: postgres
--

CREATE INDEX idx_moderador_sector_sector ON grnd.moderador_sector USING btree (sector_id);


--
-- TOC entry 4820 (class 1259 OID 17208)
-- Name: idx_sector_localidad_localidad; Type: INDEX; Schema: grnd; Owner: postgres
--

CREATE INDEX idx_sector_localidad_localidad ON grnd.sector_localidad USING btree (localidad_id);


--
-- TOC entry 4833 (class 2606 OID 17209)
-- Name: reportes FK_0133a02f6c44ee667565d9e2170; Type: FK CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.reportes
    ADD CONSTRAINT "FK_0133a02f6c44ee667565d9e2170" FOREIGN KEY ("usuarioId") REFERENCES grnd.usuarios(id);


--
-- TOC entry 4834 (class 2606 OID 17214)
-- Name: reportes FK_2ae1b5c9642c262f65629c3174a; Type: FK CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.reportes
    ADD CONSTRAINT "FK_2ae1b5c9642c262f65629c3174a" FOREIGN KEY ("tipoReporteId") REFERENCES grnd.tipos_reportes(id);


--
-- TOC entry 4835 (class 2606 OID 17219)
-- Name: reportes FK_56c224dac3bbbe85a94ed429551; Type: FK CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.reportes
    ADD CONSTRAINT "FK_56c224dac3bbbe85a94ed429551" FOREIGN KEY ("sectorId") REFERENCES grnd.sectores(id);


--
-- TOC entry 4836 (class 2606 OID 17224)
-- Name: reportes FK_9f5a7760297e1c8250297ec0ee2; Type: FK CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.reportes
    ADD CONSTRAINT "FK_9f5a7760297e1c8250297ec0ee2" FOREIGN KEY (entidad_externa_id) REFERENCES grnd.entidades_externas(id);


--
-- TOC entry 4841 (class 2606 OID 17229)
-- Name: sectores FK_b2a8da7882877dc0e3fe32c509e; Type: FK CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.sectores
    ADD CONSTRAINT "FK_b2a8da7882877dc0e3fe32c509e" FOREIGN KEY ("localidadId") REFERENCES grnd.localidades(id);


--
-- TOC entry 4837 (class 2606 OID 17234)
-- Name: reportes FK_b89ed963e02b4950b308726e4cf; Type: FK CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.reportes
    ADD CONSTRAINT "FK_b89ed963e02b4950b308726e4cf" FOREIGN KEY ("estadoId") REFERENCES grnd.estados(id);


--
-- TOC entry 4842 (class 2606 OID 17239)
-- Name: usuarios FK_ccd816326d8b5e1d61b31fbe33b; Type: FK CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.usuarios
    ADD CONSTRAINT "FK_ccd816326d8b5e1d61b31fbe33b" FOREIGN KEY (localidad_id) REFERENCES grnd.localidades(id);


--
-- TOC entry 4838 (class 2606 OID 17244)
-- Name: reportes FK_d4d2a97fde820000214e06510e5; Type: FK CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.reportes
    ADD CONSTRAINT "FK_d4d2a97fde820000214e06510e5" FOREIGN KEY ("nivelIncidenciaId") REFERENCES grnd.nivel_incidencia(id);


--
-- TOC entry 4831 (class 2606 OID 17249)
-- Name: moderador_sector moderador_sector_moderador_fk; Type: FK CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.moderador_sector
    ADD CONSTRAINT moderador_sector_moderador_fk FOREIGN KEY (moderador_id) REFERENCES grnd.moderadores(id) ON DELETE CASCADE;


--
-- TOC entry 4832 (class 2606 OID 17254)
-- Name: moderador_sector moderador_sector_sector_fk; Type: FK CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.moderador_sector
    ADD CONSTRAINT moderador_sector_sector_fk FOREIGN KEY (sector_id) REFERENCES grnd.sectores(id) ON DELETE CASCADE;


--
-- TOC entry 4839 (class 2606 OID 17264)
-- Name: sector_localidad sector_localidad_localidad_fk; Type: FK CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.sector_localidad
    ADD CONSTRAINT sector_localidad_localidad_fk FOREIGN KEY (localidad_id) REFERENCES grnd.localidades(id) ON DELETE RESTRICT;


--
-- TOC entry 4840 (class 2606 OID 17269)
-- Name: sector_localidad sector_localidad_sector_fk; Type: FK CONSTRAINT; Schema: grnd; Owner: postgres
--

ALTER TABLE ONLY grnd.sector_localidad
    ADD CONSTRAINT sector_localidad_sector_fk FOREIGN KEY (sector_id) REFERENCES grnd.sectores(id) ON DELETE CASCADE;


-- Completed on 2025-09-16 15:49:30

--
-- PostgreSQL database dump complete
--

