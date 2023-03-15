---
title: Amazon RDS for MySQL/ Aurora CDC Reader configuration.
description: Using Amazon RDS for MySQL/ Aurora as a source. Configure MySQL Binary logging.
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

Using MySQL binary logs, the DBConvert Streams platform can retrieve data from Amazon RDS for MySQL/ Aurora. These logs contain records of data change events on the MySQL server. Whenever an `INSERT`, `UPDATE`, or `DELETE` event is written to the binary logs, MySQL Reader captures them immediately and passes them to the DBS event hub.

## Create Amazon RDS for MySQL database. 
> **Note**: You can disregard this step if you have already created a database.

To create an Amazon RDS for MySQL database, please follow these steps:

1. Go to the [Amazon RDS console](https://console.aws.amazon.com/rds).
1. Click the `Create database` button.
1. Select MySQL as the database type and choose the desired version.

  ![Create new Amazon RDS for MySQL database](/images/amazon-rds-mysql/create-rds-mysql.png)

4. Configure parameters in the **`settings`** section, including `DB Instance identifier`, `Credential settings`, `instance type` and `storage`.
1. (Optional) In the `Connectivity` section, select `Connect to an EC2 compute resource` and choose an existing EC2 instance to connect to the database. This step can help you automatically connect [DBConvert Services running on EC2](/guide/deploy-ec2) with MySQL without allowlisting them on the database side.

  ![Create new Amazon RDS for MySQL database](/images/amazon-rds-mysql/connectivity.png)

6. Ensure that `automatic backups` are activated for *at least one day* for the binary log to capture data modifications.

  ![Automated backups](/images/amazon-rds-mysql/enable-backups.png)

7. Review configuration and click the `Create database` button to create your Amazon RDS for MySQL database.

## Set up MySQL Binary logs for Replication.

To enable MySQL Binary Log (Binlog) replication, you must configure some parameters.

1. Open the [Amazon RDS console](https://console.aws.amazon.com/rds).
1. Create new `parameter group`. 

 ![Create new Parameter group](/images/amazon-rds-mysql/create-param-group.png)

3. Click `Edit parameters`.
Update the values of the parameters as follows:

| Parameter Name | Value |
| --- | --- |
| binlog_format | ROW |
| binlog_row_image | full | 

4. Click `Save changes`.
1. Select your database, then click the `Modify` button.   
1. Scroll down to the `Additional configuration` section and select recently created *parameter group* as the `DB parameter group`.

 ![Apply DB Parameter group](/images/amazon-rds-mysql/apply-db-param-group.png)

7. In the `Databases` panel, select `Reboot` from the `Actions` drop-down to restart your Amazon RDS MySQL instance for the changes to take effect.

 ![Reboot](/images/amazon-rds-mysql/reboot.png)

---
Discover further details regarding the complete set of properties applicable to the MySQL Reader by visiting the following source: [MySQL Reader properties](/sources/mysql/reader-properties).
