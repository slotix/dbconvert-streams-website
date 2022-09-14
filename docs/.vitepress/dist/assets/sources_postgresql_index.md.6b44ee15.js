import{_ as s,c as a,o as n,a as e}from"./app.47236b7f.js";const A=JSON.parse('{"title":"DBConvert-stream - Usage","description":"Counter","frontmatter":{"title":"DBConvert-stream - Usage","description":"Counter","layout":"doc","lastUpdated":true},"headers":[{"level":2,"title":"PostgreSQL configuration","slug":"postgresql-configuration","link":"#postgresql-configuration","children":[{"level":3,"title":"Custom config file.","slug":"custom-config-file","link":"#custom-config-file","children":[]},{"level":3,"title":"postgresql.conf settings.","slug":"postgresql-conf-settings","link":"#postgresql-conf-settings","children":[]},{"level":3,"title":"Clean old WAL files.","slug":"clean-old-wal-files","link":"#clean-old-wal-files","children":[]},{"level":3,"title":"pgAdmin","slug":"pgadmin","link":"#pgadmin","children":[]}]},{"level":2,"title":"FAQ","slug":"faq","link":"#faq","children":[{"level":3,"title":"Russian translation of the article about PostgreSQL replication.","slug":"russian-translation-of-the-article-about-postgresql-replication","link":"#russian-translation-of-the-article-about-postgresql-replication","children":[]},{"level":3,"title":"What data is captured by logical encoding?","slug":"what-data-is-captured-by-logical-encoding","link":"#what-data-is-captured-by-logical-encoding","children":[]},{"level":3,"title":"Logical encoding is applicable at small loads. When we are talking about 2 or more WALs per second, there may already be problems with the replication lag.","slug":"logical-encoding-is-applicable-at-small-loads-when-we-are-talking-about-2-or-more-wals-per-second-there-may-already-be-problems-with-the-replication-lag","link":"#logical-encoding-is-applicable-at-small-loads-when-we-are-talking-about-2-or-more-wals-per-second-there-may-already-be-problems-with-the-replication-lag","children":[]}]},{"level":2,"title":"PostgreSQL Libraries","slug":"postgresql-libraries","link":"#postgresql-libraries","children":[]},{"level":2,"title":"Stuff","slug":"stuff","link":"#stuff","children":[{"level":3,"title":"List replication slots","slug":"list-replication-slots","link":"#list-replication-slots","children":[]},{"level":3,"title":"Replication slots name","slug":"replication-slots-name","link":"#replication-slots-name","children":[]}]},{"level":2,"title":"Using pg_dump for getting Create table DDL","slug":"using-pg-dump-for-getting-create-table-ddl","link":"#using-pg-dump-for-getting-create-table-ddl","children":[{"level":3,"title":"How to generate create table statements in postgresql","slug":"how-to-generate-create-table-statements-in-postgresql","link":"#how-to-generate-create-table-statements-in-postgresql","children":[]}]},{"level":2,"title":"Testing","slug":"testing","link":"#testing","children":[{"level":3,"title":"Create tables","slug":"create-tables","link":"#create-tables","children":[]},{"level":3,"title":"Test INSERT, UPDATE, DELETE Operations","slug":"test-insert-update-delete-operations","link":"#test-insert-update-delete-operations","children":[]},{"level":3,"title":"Bulk insert","slug":"bulk-insert","link":"#bulk-insert","children":[]}]},{"level":2,"title":"Create Stream","slug":"create-stream","link":"#create-stream","children":[]}],"relativePath":"sources/postgresql/index.md","lastUpdated":1663172001000}'),l={name:"sources/postgresql/index.md"},t=e(`<h2 id="postgresql-configuration" tabindex="-1">PostgreSQL configuration <a class="header-anchor" href="#postgresql-configuration" aria-hidden="true">#</a></h2><p>Receive database events from PostgreSQL using logical replication protocol and transform them into a common event format.</p><h3 id="custom-config-file" tabindex="-1">Custom config file. <a class="header-anchor" href="#custom-config-file" aria-hidden="true">#</a></h3><p>Sample config file is provided by PostgreSQL which is available in the container at <code>/usr/share/postgresql/postgresql.conf.sample</code> (<code>/usr/local/share/postgresql/postgresql.conf.sample</code> in Alpine variants).</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">docker run -i --rm postgres:14.1-alpine cat /usr/local/share/postgresql/postgresql.conf.sample &gt; postgres.conf</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="postgresql-conf-settings" tabindex="-1">postgresql.conf settings. <a class="header-anchor" href="#postgresql-conf-settings" aria-hidden="true">#</a></h3><p>In <code>postgresql.conf</code> you need to set <code>wal_level = logical</code> to make logical replication possible. <code>max_wal_senders</code> and <code>max_replication_slots</code> must be at least 1 or higher if your server may be using more replication connections.</p><p>Change the following settings in your postgresql.conf:</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">wal_level=logical</span></span>
<span class="line"><span style="color:#A6ACCD;">max_wal_senders=10</span></span>
<span class="line"><span style="color:#A6ACCD;">max_replication_slots=10</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="clean-old-wal-files" tabindex="-1">Clean old WAL files. <a class="header-anchor" href="#clean-old-wal-files" aria-hidden="true">#</a></h3><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">pg_archivecleanup -d pg_wal 000000010000000A0000006B</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>Check list of slots:</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">SELECT slot_name, plugin, slot_type, database, active, restart_lsn, confirmed_flush_lsn FROM pg_replication_slots;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>destroy a slot you no longer need to stop it consuming</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">SELECT pg_drop_replication_slot(&#39;replication_slot&#39;);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="pgadmin" tabindex="-1">pgAdmin <a class="header-anchor" href="#pgadmin" aria-hidden="true">#</a></h3><p>pgAdmin runs as the pgadmin user (UID: 5050) in the pgadmin group (GID: 5050) in the container. You must ensure that all files are readable, and where necessary (e.g. the working/session directory) writeable for this user on the host machine. For example:</p><p>sudo chown -R 5050:5050 &lt;host_directory&gt;</p><p>More info is available at <a href="https://www.pgadmin.org/docs/pgadmin4/latest/container_deployment.html#mapped-files-and-directories" target="_blank" rel="noreferrer">https://www.pgadmin.org/docs/pgadmin4/latest/container_deployment.html#mapped-files-and-directories</a></p><p>Create a publication in PostgreSQL like this:</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">CREATE PUBLICATION CDC FOR ALL TABLES;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>This will include in the publication all existing tables and also the ones that will be created in future. If you want only a subset of tables to be replicated - list them specifically.</p><p>See <a href="https://www.postgresql.org/docs/10/sql-createpublication.html" target="_blank" rel="noreferrer">PostgreSQL documentation</a> for details.</p><h2 id="faq" tabindex="-1">FAQ <a class="header-anchor" href="#faq" aria-hidden="true">#</a></h2><h3 id="russian-translation-of-the-article-about-postgresql-replication" tabindex="-1">Russian translation of the article about PostgreSQL replication. <a class="header-anchor" href="#russian-translation-of-the-article-about-postgresql-replication" aria-hidden="true">#</a></h3><p><a href="https://habr.com/ru/company/first/blog/668516/" target="_blank" rel="noreferrer">https://habr.com/ru/company/first/blog/668516/</a></p><h3 id="what-data-is-captured-by-logical-encoding" tabindex="-1">What data is captured by logical encoding? <a class="header-anchor" href="#what-data-is-captured-by-logical-encoding" aria-hidden="true">#</a></h3><p>Logical decoding can only output information about DML (data manipulation) events in Postgres, that is INSERT, UPDATE, and DELETE. DDL (data definition) changes like CREATE TABLE, ALTER ROLE, and DROP INDEX are not emitted by logical decoding.</p><h3 id="logical-encoding-is-applicable-at-small-loads-when-we-are-talking-about-2-or-more-wals-per-second-there-may-already-be-problems-with-the-replication-lag" tabindex="-1">Logical encoding is applicable at small loads. When we are talking about 2 or more WALs per second, there may already be problems with the replication lag. <a class="header-anchor" href="#logical-encoding-is-applicable-at-small-loads-when-we-are-talking-about-2-or-more-wals-per-second-there-may-already-be-problems-with-the-replication-lag" aria-hidden="true">#</a></h3><p><a href="https://gitlab.com/postgres-ai/postgresql-consulting/tests-and-benchmarks/-/issues/32" target="_blank" rel="noreferrer">https://gitlab.com/postgres-ai/postgresql-consulting/tests-and-benchmarks/-/issues/32</a></p><h2 id="postgresql-libraries" tabindex="-1">PostgreSQL Libraries <a class="header-anchor" href="#postgresql-libraries" aria-hidden="true">#</a></h2><p><a href="https://github.com/lib/pq" target="_blank" rel="noreferrer">https://github.com/lib/pq</a> is currently in maintenance mode. So we have to use <strong>pgx</strong> <a href="https://github.com/jackc/pgx" target="_blank" rel="noreferrer">https://github.com/jackc/pgx</a> which is under active development.</p><h2 id="stuff" tabindex="-1">Stuff <a class="header-anchor" href="#stuff" aria-hidden="true">#</a></h2><p>Connect to database</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">psql -h localhost -p 5432 -U postgres postgres</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>switch to pgorepl db</p><p><code>postgres=# \\c pgorepl</code></p><p>To eliminate such errors</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">ERROR:  cannot delete from table &quot;t&quot; because it does not have a replica identity and publishes deletes</span></span>
<span class="line"><span style="color:#A6ACCD;">HINT:  To enable deleting from the table, set REPLICA IDENTITY using ALTER TABLE.</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><code>pglogrepl=# ALTER TABLE t REPLICA IDENTITY FULL;</code></p><h3 id="list-replication-slots" tabindex="-1">List replication slots <a class="header-anchor" href="#list-replication-slots" aria-hidden="true">#</a></h3><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">SELECT</span></span>
<span class="line"><span style="color:#A6ACCD;">  slot_name,</span></span>
<span class="line"><span style="color:#A6ACCD;">  plugin,</span></span>
<span class="line"><span style="color:#A6ACCD;">  slot_type,</span></span>
<span class="line"><span style="color:#A6ACCD;">  datoid,</span></span>
<span class="line"><span style="color:#A6ACCD;">  database,</span></span>
<span class="line"><span style="color:#A6ACCD;">  temporary,</span></span>
<span class="line"><span style="color:#A6ACCD;">  active,</span></span>
<span class="line"><span style="color:#A6ACCD;">  active_pid,</span></span>
<span class="line"><span style="color:#A6ACCD;">  xmin,</span></span>
<span class="line"><span style="color:#A6ACCD;">  catalog_xmin,</span></span>
<span class="line"><span style="color:#A6ACCD;">  restart_lsn,</span></span>
<span class="line"><span style="color:#A6ACCD;">  confirmed_flush_lsn</span></span>
<span class="line"><span style="color:#A6ACCD;">FROM pg_replication_slots</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="replication-slots-name" tabindex="-1">Replication slots name <a class="header-anchor" href="#replication-slots-name" aria-hidden="true">#</a></h3><p>Each replication slot has a name, which can contain lower-case letters, numbers, and the underscore character. It&#39;s name cannot contain something like &quot;-&quot;. <a href="https://www.postgresql.org/docs/10/warm-standby.html#STREAMING-REPLICATION-SLOTS-MANIPULATION" target="_blank" rel="noreferrer">https://www.postgresql.org/docs/10/warm-standby.html#STREAMING-REPLICATION-SLOTS-MANIPULATION</a></p><h2 id="using-pg-dump-for-getting-create-table-ddl" tabindex="-1">Using pg_dump for getting Create table DDL <a class="header-anchor" href="#using-pg-dump-for-getting-create-table-ddl" aria-hidden="true">#</a></h2><p>How to get &quot;create table&quot; statements from postgres? There is no MySQL equivalent of a command like &quot;SHOW CREATE TABLE table&quot; So there is a way to use the pg_dump utility for this.</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">pg_dump -t &#39;public.t&#39; --schema-only postgres -h &#39;127.0.0.1&#39; -U &#39;postgres&#39;                                        </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">Password: </span></span>
<span class="line"><span style="color:#A6ACCD;">--</span></span>
<span class="line"><span style="color:#A6ACCD;">-- PostgreSQL database dump</span></span>
<span class="line"><span style="color:#A6ACCD;">--</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">-- Dumped from database version 13.6</span></span>
<span class="line"><span style="color:#A6ACCD;">-- Dumped by pg_dump version 13.6</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">SET statement_timeout = 0;</span></span>
<span class="line"><span style="color:#A6ACCD;">SET lock_timeout = 0;</span></span>
<span class="line"><span style="color:#A6ACCD;">SET idle_in_transaction_session_timeout = 0;</span></span>
<span class="line"><span style="color:#A6ACCD;">SET client_encoding = &#39;UTF8&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;">SET standard_conforming_strings = on;</span></span>
<span class="line"><span style="color:#A6ACCD;">SELECT pg_catalog.set_config(&#39;search_path&#39;, &#39;&#39;, false);</span></span>
<span class="line"><span style="color:#A6ACCD;">SET check_function_bodies = false;</span></span>
<span class="line"><span style="color:#A6ACCD;">SET xmloption = content;</span></span>
<span class="line"><span style="color:#A6ACCD;">SET client_min_messages = warning;</span></span>
<span class="line"><span style="color:#A6ACCD;">SET row_security = off;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">SET default_tablespace = &#39;&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">SET default_table_access_method = heap;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">--</span></span>
<span class="line"><span style="color:#A6ACCD;">-- Name: t; Type: TABLE; Schema: public; Owner: postgres</span></span>
<span class="line"><span style="color:#A6ACCD;">--</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">CREATE TABLE public.t (</span></span>
<span class="line"><span style="color:#A6ACCD;">    id integer,</span></span>
<span class="line"><span style="color:#A6ACCD;">    name text</span></span>
<span class="line"><span style="color:#A6ACCD;">);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">ALTER TABLE public.t OWNER TO postgres;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">--</span></span>
<span class="line"><span style="color:#A6ACCD;">-- PostgreSQL database dump complete</span></span>
<span class="line"><span style="color:#A6ACCD;">--</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="how-to-generate-create-table-statements-in-postgresql" tabindex="-1">How to generate create table statements in postgresql <a class="header-anchor" href="#how-to-generate-create-table-statements-in-postgresql" aria-hidden="true">#</a></h3><p>Please use below query to get create table statement, please pass the table name in where clause</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">select &#39;CREATE TABLE &#39; || a.attrelid::regclass::text || &#39;(&#39; ||</span></span>
<span class="line"><span style="color:#A6ACCD;">string_agg(a.attname || &#39; &#39; || pg_catalog.format_type(a.atttypid,</span></span>
<span class="line"><span style="color:#A6ACCD;">a.atttypmod)||</span></span>
<span class="line"><span style="color:#A6ACCD;">    CASE WHEN</span></span>
<span class="line"><span style="color:#A6ACCD;">        (SELECT substring(pg_catalog.pg_get_expr(d.adbin, d.adrelid) for 128)</span></span>
<span class="line"><span style="color:#A6ACCD;">         FROM pg_catalog.pg_attrdef d</span></span>
<span class="line"><span style="color:#A6ACCD;">         WHERE d.adrelid = a.attrelid AND d.adnum = a.attnum AND a.atthasdef) IS NOT </span></span>
<span class="line"><span style="color:#A6ACCD;">NULL THEN</span></span>
<span class="line"><span style="color:#A6ACCD;">        &#39; DEFAULT &#39;|| (SELECT substring(pg_catalog.pg_get_expr(d.adbin, d.adrelid) for 128)</span></span>
<span class="line"><span style="color:#A6ACCD;">                      FROM pg_catalog.pg_attrdef d</span></span>
<span class="line"><span style="color:#A6ACCD;">                      WHERE d.adrelid = a.attrelid AND d.adnum = a.attnum AND a.atthasdef)</span></span>
<span class="line"><span style="color:#A6ACCD;">    ELSE</span></span>
<span class="line"><span style="color:#A6ACCD;">        &#39;&#39; END</span></span>
<span class="line"><span style="color:#A6ACCD;">||</span></span>
<span class="line"><span style="color:#A6ACCD;">    CASE WHEN a.attnotnull = true THEN</span></span>
<span class="line"><span style="color:#A6ACCD;">        &#39; NOT NULL&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    ELSE</span></span>
<span class="line"><span style="color:#A6ACCD;">        &#39;&#39; END,E&#39;\\n,&#39;) || &#39;);&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">FROM pg_catalog.pg_attribute a join pg_class on a.attrelid=pg_class.oid</span></span>
<span class="line"><span style="color:#A6ACCD;">WHERE a.attrelid::regclass::varchar =</span></span>
<span class="line"><span style="color:#A6ACCD;">&#39;table_name&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">AND a.attnum &gt; 0 AND NOT a.attisdropped  and pg_class.relkind=&#39;r&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">group by a.attrelid;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="testing" tabindex="-1">Testing <a class="header-anchor" href="#testing" aria-hidden="true">#</a></h2><h3 id="create-tables" tabindex="-1">Create tables <a class="header-anchor" href="#create-tables" aria-hidden="true">#</a></h3><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">-- Table: public.products1</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">-- DROP TABLE IF EXISTS public.products1;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">CREATE TABLE IF NOT EXISTS public.products1</span></span>
<span class="line"><span style="color:#A6ACCD;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">    id bigint NOT NULL,</span></span>
<span class="line"><span style="color:#A6ACCD;">    name character varying(255) COLLATE pg_catalog.&quot;default&quot; NOT NULL,</span></span>
<span class="line"><span style="color:#A6ACCD;">    price numeric(12,2) NOT NULL,</span></span>
<span class="line"><span style="color:#A6ACCD;">    weight double precision NOT NULL,</span></span>
<span class="line"><span style="color:#A6ACCD;">    created timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,</span></span>
<span class="line"><span style="color:#A6ACCD;">    CONSTRAINT products1_pkey PRIMARY KEY (id)</span></span>
<span class="line"><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="test-insert-update-delete-operations" tabindex="-1">Test INSERT, UPDATE, DELETE Operations <a class="header-anchor" href="#test-insert-update-delete-operations" aria-hidden="true">#</a></h3><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">TRUNCATE products;</span></span>
<span class="line"><span style="color:#A6ACCD;">TRUNCATE products1;</span></span>
<span class="line"><span style="color:#A6ACCD;">INSERT Into products (id, price, name, weight) VALUES </span></span>
<span class="line"><span style="color:#A6ACCD;">(1, 0.63,&#39;Prod1&#39;, 312),</span></span>
<span class="line"><span style="color:#A6ACCD;">(2, 3.9, &#39;Prod2&#39;,332), </span></span>
<span class="line"><span style="color:#A6ACCD;">(3, 0.02, &#39;Prod3&#39;,452) ;</span></span>
<span class="line"><span style="color:#A6ACCD;">INSERT Into products1 (id, price, name, weight) VALUES </span></span>
<span class="line"><span style="color:#A6ACCD;">(1, 0.63,&#39;Prod1&#39;, 312),</span></span>
<span class="line"><span style="color:#A6ACCD;">(2, 3.9, &#39;Prod2&#39;,332), </span></span>
<span class="line"><span style="color:#A6ACCD;">(3, 0.02, &#39;Prod3&#39;,452) ;</span></span>
<span class="line"><span style="color:#A6ACCD;">INSERT Into products (id,price,name,weight) VALUES </span></span>
<span class="line"><span style="color:#A6ACCD;">(4, 0.69, &#39;Bread&#39;,200), </span></span>
<span class="line"><span style="color:#A6ACCD;">(5, 2.59, &#39;Butter&#39;,199), </span></span>
<span class="line"><span style="color:#A6ACCD;">(6, 1.09, &#39;Fanta&#39;,322) ;</span></span>
<span class="line"><span style="color:#A6ACCD;">INSERT Into products1 (id,price,name,weight) VALUES </span></span>
<span class="line"><span style="color:#A6ACCD;">(4,0.69, &#39;Bread&#39;,200), </span></span>
<span class="line"><span style="color:#A6ACCD;">(5, 2.59, &#39;Butter&#39;,199), </span></span>
<span class="line"><span style="color:#A6ACCD;">(6, 1.09, &#39;Fanta&#39;,322) ;</span></span>
<span class="line"><span style="color:#A6ACCD;">UPDATE products SET name=&#39;Coca-Cola&#39; WHERE id=6;</span></span>
<span class="line"><span style="color:#A6ACCD;">UPDATE products1 SET name=&#39;Coca-Cola&#39; WHERE id=6;</span></span>
<span class="line"><span style="color:#A6ACCD;">DELETE FROM products WHERE id in (4,5);</span></span>
<span class="line"><span style="color:#A6ACCD;">DELETE FROM products1 WHERE id in (4,5);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="bulk-insert" tabindex="-1">Bulk insert <a class="header-anchor" href="#bulk-insert" aria-hidden="true">#</a></h3><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">TRUNCATE t;</span></span>
<span class="line"><span style="color:#A6ACCD;">INSERT INTO t(id, name) </span></span>
<span class="line"><span style="color:#A6ACCD;">	SELECT g.id, k.name FROM generate_series(1, 100001) as g(id), </span></span>
<span class="line"><span style="color:#A6ACCD;">	substr(md5(random()::text), 0, 25) as k(name);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="create-stream" tabindex="-1">Create Stream <a class="header-anchor" href="#create-stream" aria-hidden="true">#</a></h2><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">curl --request POST --url http://127.0.0.1:8020/ -H </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Content-Type: application/json</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> -d </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">{</span></span>
<span class="line"><span style="color:#C3E88D;">   &quot;source&quot;:{</span></span>
<span class="line"><span style="color:#C3E88D;">      &quot;type&quot;:&quot;postgresql&quot;,</span></span>
<span class="line"><span style="color:#C3E88D;">      &quot;connection&quot;:{</span></span>
<span class="line"><span style="color:#C3E88D;">         &quot;host&quot;:&quot;localhost&quot;,</span></span>
<span class="line"><span style="color:#C3E88D;">         &quot;port&quot;:5432,</span></span>
<span class="line"><span style="color:#C3E88D;">         &quot;user&quot;:&quot;postgres&quot;,</span></span>
<span class="line"><span style="color:#C3E88D;">         &quot;password&quot;:&quot;postgres&quot;,</span></span>
<span class="line"><span style="color:#C3E88D;">         &quot;database&quot;:&quot;postgres&quot;, </span></span>
<span class="line"><span style="color:#C3E88D;">         &quot;SSLMode&quot;:&quot;disable&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">      },</span></span>
<span class="line"><span style="color:#C3E88D;">      &quot;settings&quot;:{</span></span>
<span class="line"><span style="color:#C3E88D;">         &quot;replicationSlotName&quot;:&quot;myslot_1&quot;,</span></span>
<span class="line"><span style="color:#C3E88D;">         &quot;publicationName&quot;:&quot;dbconvert-publication&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">      },</span></span>
<span class="line"><span style="color:#C3E88D;">      &quot;initialLoad&quot;:false,</span></span>
<span class="line"><span style="color:#C3E88D;">      &quot;filter&quot;:{</span></span>
<span class="line"><span style="color:#C3E88D;">         &quot;tables&quot;:{</span></span>
<span class="line"><span style="color:#C3E88D;">            &quot;products1&quot;:[</span></span>
<span class="line"><span style="color:#C3E88D;">               &quot;insert&quot;,</span></span>
<span class="line"><span style="color:#C3E88D;">               &quot;update&quot;,</span></span>
<span class="line"><span style="color:#C3E88D;">               &quot;delete&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">            ],</span></span>
<span class="line"><span style="color:#C3E88D;">            &quot;products2&quot;:[</span></span>
<span class="line"><span style="color:#C3E88D;">               &quot;insert&quot;,</span></span>
<span class="line"><span style="color:#C3E88D;">               &quot;update&quot;,</span></span>
<span class="line"><span style="color:#C3E88D;">               &quot;delete&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">            ]</span></span>
<span class="line"><span style="color:#C3E88D;">         }</span></span>
<span class="line"><span style="color:#C3E88D;">      }</span></span>
<span class="line"><span style="color:#C3E88D;">   },</span></span>
<span class="line"><span style="color:#C3E88D;">   &quot;destination&quot;:{</span></span>
<span class="line"><span style="color:#C3E88D;">      &quot;type&quot;:&quot;postgresql&quot;,</span></span>
<span class="line"><span style="color:#C3E88D;">      &quot;connection&quot;:{</span></span>
<span class="line"><span style="color:#C3E88D;">         &quot;host&quot;:&quot;localhost&quot;,</span></span>
<span class="line"><span style="color:#C3E88D;">         &quot;port&quot;:5432,</span></span>
<span class="line"><span style="color:#C3E88D;">         &quot;user&quot;:&quot;postgres&quot;,</span></span>
<span class="line"><span style="color:#C3E88D;">         &quot;password&quot;:&quot;postgres&quot;,</span></span>
<span class="line"><span style="color:#C3E88D;">         &quot;database&quot;:&quot;destination&quot;,</span></span>
<span class="line"><span style="color:#C3E88D;">         &quot;SSLMode&quot;:&quot;disable&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">      },</span></span>
<span class="line"><span style="color:#C3E88D;">      &quot;initialLoad&quot;:false,</span></span>
<span class="line"><span style="color:#C3E88D;">      &quot;filter&quot;:{</span></span>
<span class="line"><span style="color:#C3E88D;">         &quot;tables&quot;:{</span></span>
<span class="line"><span style="color:#C3E88D;">            &quot;products1&quot;:[</span></span>
<span class="line"><span style="color:#C3E88D;">               &quot;insert&quot;,</span></span>
<span class="line"><span style="color:#C3E88D;">               &quot;update&quot;,</span></span>
<span class="line"><span style="color:#C3E88D;">               &quot;delete&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">            ],</span></span>
<span class="line"><span style="color:#C3E88D;">            &quot;products2&quot;:[</span></span>
<span class="line"><span style="color:#C3E88D;">               &quot;insert&quot;,</span></span>
<span class="line"><span style="color:#C3E88D;">               &quot;update&quot;,</span></span>
<span class="line"><span style="color:#C3E88D;">               &quot;delete&quot;</span></span>
<span class="line"><span style="color:#C3E88D;">            ]</span></span>
<span class="line"><span style="color:#C3E88D;">         }</span></span>
<span class="line"><span style="color:#C3E88D;">      }</span></span>
<span class="line"><span style="color:#C3E88D;">   },</span></span>
<span class="line"><span style="color:#C3E88D;">   &quot;limits&quot;:{</span></span>
<span class="line"><span style="color:#C3E88D;">      &quot;records&quot;:100000,</span></span>
<span class="line"><span style="color:#C3E88D;">      &quot;time&quot;:0</span></span>
<span class="line"><span style="color:#C3E88D;">   }</span></span>
<span class="line"><span style="color:#C3E88D;">}</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span></code></pre></div>`,59),p=[t];function o(c,i,r,d,u,C){return n(),a("div",null,p)}const h=s(l,[["render",o]]);export{A as __pageData,h as default};
