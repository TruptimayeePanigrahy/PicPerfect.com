![logo](https://github.com/Shashwat2104/JS-assignments/assets/115514170/a18b703e-a4e6-47d7-87b1-eb8ac75df25b)

# PICPERFECT :camera_flash:
A photographer booking system allows logged-in users to book a shoot with their desired photographer. <br>
Enthusiastic and professional photographers can apply to become photographers on our website.

#### Our Project is deployed here [PICPERFECT](https://bookmyshoot.netlify.app/)

### Team 
- :woman_technologist: [Truptimayee Panigrahy](https://www.linkedin.com/in/truptimayee-panigrahy/)
- :man_technologist: [Shashwat Mahendra](https://www.linkedin.com/in/shashwat-mahendra-214598163/)
- :man_technologist: [Saikumar Sandru]()
- :man_technologist: [Pranay Paul](https://www.linkedin.com/in/pranay-paul-6a5220257/)
- :man_technologist: [Ritesh Kothawade](https://www.linkedin.com/in/ritesh-kothawade-800879270/)

## Features & Pages : page_facing_up:

### For User 	: adult:
`Home` - Overview of the website and find the photographers. <br>
`Sign Up` -  You can use your email, GitHub, or Google account to sign up. The user details are stored in a MongoDB database. <br>
`Sign In` - Authentication is performed here to verify if the provided details match the information stored in the database. <br>
`Apply for photographer` - Users have the option to apply for a photographer role, enabling them to receive appointments for photoshoots. <br>

##### Photographer
`About` - Once the admins approve the role, photographers can 
- **Upload their previous works:** Photographers can showcase their portfolio by uploading their previous works, allowing potential clients to get a glimpse of their photography style and skills. 
- **Details about themselves:** Photographers can provide information about themselves, including their background, experience, and any unique aspects that set them apart.
- **Equipment they use:** Photographers can list the equipment they use for their shoots
- **Price for an hour:** Photographers can specify their pricing structure, indicating the cost per hour of their photography services.  <br> <br>

`Approval` - Once a photographer receives an appointment request, they can accept or reject the appointment. 

### For Admin : guard:
`All users` - Admin will be able to view information about all registered users. This includes access to user profiles, contact details, and any additional information provided during the registration process. <br> <br>
`Approve` - Once a user has applied for the photographer role, the admin will review the details provided by the user. Based on the assessment, the admin can approve or reject the application. This process ensures that only qualified and suitable individuals are granted the photographer role on the platform. <br> <br>

## User Experience Flow
You will land on the home page. From the navigation bar, click on "Signup" to be redirected to the signup portal and register as a user. You will need to provide your email and password for logging in. After logging in, you can explore the home page and discover photographers who are available based on your requirements. Select a photographer and access their details. If you are satisfied with the photographer's previous works and comfortable with the price, you can book them for a specific day or multiple days. After booking a photographer, you can initiate a video chat with them through your client dashboard once they accept your booking.

If you are a professional or aspiring photographer, you have the opportunity to apply for the photographer role on our website. By applying for this role, you gain access to a range of benefits, including the ability to receive appointment requests from various users on our platform. This means that users interested in photography services can directly reach out to you to book appointments and hire you for their photography needs. It's a great opportunity to showcase your skills, expand your client base, and connect with individuals seeking photography services through our platform.

### Have a look at our routes in `Swagger`

[API](https://bookmyshoot-backend.onrender.com/api-docs)

### Deloployed Links
Backend on [Render](https://bookmyshoot-backend.onrender.com) <br>
Frontend on [Netlify](https://bookmyshoot.netlify.app/)

## 🏷️ Tech Stack Used:-

### Frontend

| React                                                                                                                          | Ant Design                                                                                                                     | Bootstrap                                                                                                                      | HTML                                                                                                                           | CSS                                                                                                                            | JavaScript                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| <img width="75px" src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png"> | <img width="75px" src="https://user-images.githubusercontent.com/25181517/190887795-99cb0921-e57f-430b-a111-e165deedaa36.png"> | <img width="75px" src="https://user-images.githubusercontent.com/25181517/183898054-b3d693d4-dafb-4808-a509-bab54cf5de34.png"> | <img width="75px" src="https://user-images.githubusercontent.com/25181517/192158954-f88b5814-d510-4564-b285-dff7d6400dad.png"> | <img width="75px" src="https://user-images.githubusercontent.com/25181517/183898674-75a4a1b1-f960-4ea9-abcb-637170a00a75.png"> | <img width="70px" src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png"> |

#### Extra:-

> - AOS (Animate On Scroll)

---

### Backend

| Node.js                                                                                                                         | Express.js                                                                                                                      | ChatGPT                                                                                                                         | MongoDB                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| <img width="70px" src="https://user-images.githubusercontent.com/112753481/229047696-de3bf177-16a0-4161-a140-dd89e4fe7b22.png"> | <img width="75px" src="https://user-images.githubusercontent.com/112753481/229164589-4e724000-542d-4deb-9e11-cca7739c2b01.png"> | <img width="60px" src="https://user-images.githubusercontent.com/112753481/229306156-d2f82fe0-abb5-469a-9dfd-af3207e1e421.png"> | <img width="75px" src="https://cdn.icon-icons.com/icons2/2415/PNG/512/mongodb_original_logo_icon_146424.png"> |

<!-- | <img width="75px" src="https://user-images.githubusercontent.com/25181517/182884894-d3fa6ee0-f2b4-4960-9961-64740f533f2a.png">  -->

#### Extra:-

> - JWT (JsonWebToken) <br/>
> - Bcrypt <br/>
> - ChatGPT (Used for dummy-data generation only)
> - NodeMailer <br/>
> - Twilio

---

### \* Yet to be implemented:-

| Redis                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------ |
| <img width="75px" src="https://user-images.githubusercontent.com/25181517/182884894-d3fa6ee0-f2b4-4960-9961-64740f533f2a.png"> |

---

<br/>

# User flow & Authentication Design ✅

![png](https://user-images.githubusercontent.com/112753481/229455850-3ca71159-9d7c-411e-af9a-04ea5058cf38.jpeg)

---

### Take a glimpse at our website

#### Home Page
![index](https://github.com/TruptimayeePanigrahy/true-mine-3269/blob/main/frontend/Media/home%20page.png)


#### Photographers Dashboard
![photogrpahers](https://github.com/TruptimayeePanigrahy/true-mine-3269/blob/main/frontend/Media/land%20page.png)


#### Photographer Page

![individual](https://github.com/TruptimayeePanigrahy/true-mine-3269/blob/main/frontend/Media/signup.png)
