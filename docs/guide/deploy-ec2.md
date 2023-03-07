---
title: Deploy DBConvert Streams to Amazon EC2.
description: How to deploy DBConvert Streams to Amazon EC2.
layout: doc
lastUpdated: true
---

# {{ $frontmatter.title }}

We are going to create an instance in Amazon Elastic Compute Cloud (EC2). 
Then to deploy DBConvert Streams there can be done by following the steps below:


## Launch Amazon EC2 Instance.

Here are the general steps to launch an EC2 instance on AWS:

1. Log in to the AWS Management Console.
1. Navigate to the EC2 dashboard.
1. Click on the `Launch Instance` button.
1. Choose an Amazon Machine Image (AMI) - this is the operating system and software that the instance will use.
1. Select the instance type - this determines the hardware resources available to the instance, such as CPU, memory, and storage.  
    > The minimum hardware resources required for launching DBConvert Streams on an AWS EC2 server are 1 CPU / 2 GB RAM. You may begin with an AWS `t2.micro` instance and opt for a more powerful server if high throughput is expected when replicating data between the source DB and target.
![Launch new EC2 instance.](/images/ec2/launch-instance.png)
1. Select or create a key pair to access the instance via SSH.  
![Configure key pair.](/images/ec2/launch-instance-2.png)
1. Click on the `Launch instanse` button and wait until the new instance is initialized.

![Running instance.](/images/ec2/launch-instance-3.png)

After the instance is launched, it will typically take a few minutes to become available. Once it is up and running, you can connect to it via SSH.

## Connect to Amazon EC2.
1. Click the `Connect` button at the top
1. Navigate to the 'SSH client' tab to view your instance connection details.
![Connect to EC2 instance](/images/ec2/connect-1.png)
1. Copy and paste the command into terminal to connect to your instance using its Public DNS via ssh.
To connect to your instance using its Public DNS via SSH, copy and paste the following command into your terminal:
```bash
ssh -i "/path/to/your/key.pem" ec2-user@public-dns-name
```
Note that you will need to replace `/path/to/your/key.pem` with the file path to the private key file you used to launch the instance, and `public-dns-name` with the Public DNS of your instance. Also, make sure that the security group associated with the instance allows incoming SSH traffic on port 22.

Example:
```bash
ssh -i "~/.ssh/dbs.pem" ec2-user@ec2-18-156-117-231.eu-central-1.compute.amazonaws.com
```
![Connected](/images/ec2/connect-2.png)

## Install Docker.
To install Docker on your EC2 instance, follow these steps:

1. Run the command below to ensure your operating system has the latest security updates and bug fixes for its installed packages.
    ```bash
     sudo yum update
    ```
1. Run the following command to install docker.
    ```bash
    sudo yum install docker
    ```
1. Add `ec2-user` to the `docker` group to run Docker commands without using the `sudo` command.
    ```bash
    sudo usermod -a -G docker ec2-user
    ```
1. Switch the current shell session to the `docker` group, allowing the user to run Docker commands without opening a new shell session.
    ```bash
    newgrp docker
    ```
1. Enable the Docker service to start automatically at boot time.
    ```bash
    sudo systemctl enable docker.service
    ```
1. Start the Docker service 
    ```bash
    sudo systemctl start docker.service
    ```

## Install Docker Compose.

Since DBConvert Streams relies on several services, it's advisable to utilize Docker Compose to initiate the necessary containers. This tool allows you to define and run multi-container Docker applications, simplifying managing the services and dependencies required by DBConvert Streams.

1. Install the Python package manager pip for Python 3 
    ```bash
    sudo yum install python3-pip
    ```
1. Install Docker Compose. 
    ```bash
    pip3 install --user docker-compose
    ```

To learn how to use Docker Compose files to initiate DBS services, refer to the
[DBS docker containers section](https://stream.dbconvert.com/guide/dbs-docker) of the DBConvert Streams guide.

