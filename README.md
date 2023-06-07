# Demo: News Manager Showcase - NestJS, AngularJS, Postgresql 

Welcome to the demonstration of creating an application from scratch using NestJS, AngularJS, PostgreSQL. This demo exemplifies the integration of different technologies, these technologies are:

- **NestJS**: This robust backend framework enables the development of scalable and maintainable server-side applications. Its modular architecture, dependency injection, and extensive ecosystem facilitate rapid development and efficient API creation.
- **AngularJS**: **(Under construction, not yet added)** It is an open-source JavaScript framework maintained by Google, designed for building single-page web applications. It provides a structured, modular approach to software development with features like two-way data binding, dependency injection, and reusable components. AngularJS encourages clean, maintainable, and scalable code, facilitating robust and high-performance web application development.
- **PostgreSQL**: A powerful SQL database renowned for its robust data management capabilities, ACID compliance, and extensive SQL support. PostgreSQL provides reliability, scalability, and advanced features, making it ideal for applications requiring strong data integrity and complex querying capabilities.

In this demo, I will showcase the seamless integration of NestJS and AngularJS for creating a robust web application. 

This demo includes an administration panel of the different parts of the project to facilitate its visualization and management. For the creation of this administration panel, different open source technologies were used.

Once the project is installed you can access the administration panel using localhost.

# Use Case: News Management & User Engagement
The objective of this project is to create two interfaces: one for the administrator to post news in different categories, and another for users to comment on these news articles.

The administrator interface will allow authorized users to log in and access a dedicated dashboard. From there, they can create, edit, and publish news articles. The interface will provide options to categorize each news article appropriately, ensuring organized content management.

The user interface, on the other hand, will be designed for regular users who want to read and interact with the news articles. Users will have the ability to view the published news, select specific articles, and leave comments. The interface will include features that allow users to register, log in, and manage their comments.

Security measures will be implemented to ensure that only authorized administrators can access the post creation and management functionalities. Additionally, user authentication and authorization systems will be put in place to regulate user access and prevent unauthorized actions.

The interfaces will be designed with a user-friendly approach, prioritizing intuitive navigation and seamless interactions. The design will be responsive, adapting to different screen sizes and devices, providing a consistent experience across platforms.

By developing these two interfaces, the project aims to create a comprehensive platform where administrators can easily manage and publish news articles, while users can engage in discussions and share their opinions through comments.

# Documentation
- [Backend - Nest](./backend/README.md)
- Frontend - Angular: (under construction)

# Install demo
To install the demo you must have docker and docker compose installed on your computer.
If it is already installed use the following command:

```sh
docker compose -p demo up -d --build
```

## Uninstall demo
If you want to uninstall the demo use the following command:

```sh
docker compose -p demo down -v
```

## Some useful commands
```bash
# Postgresql
docker container exec -it demo-postgres psql -U develop -d develop
```

# Contact

If you liked this demo and would like to hire me, please feel free to send an email to **contact@alfonsoprado.com** or **alfonso.prado.s@gmail.com**. I would be delighted to discuss any potential opportunities or answer any further questions you may have. Thank you for your interest!

Happiness is in sharing, I hope you find it useful. Any criticism or anything you want to add you are free to do so.

# License

The following demo is licensed under the [MIT license](LICENSE).

