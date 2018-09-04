DROP DATABASE IF EXISTS `vape-club`;
CREATE DATABASE IF NOT EXISTS `vape-club`;
USE `vape-club`;

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(25) NOT NULL,
    description VARCHAR(150) NOT NULL
);
INSERT INTO `roles`
(name, description)
VALUES
("Cliente", "Cliente de la app."),
('Manager', 'Manager de negocio'),
("Administrador", "Developer");

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(25) NOT NULL,
    email VARCHAR(50) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    password_hash VARCHAR(350) NOT NULL,
    reg_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_role INT UNSIGNED DEFAULT 1 NOT NULL,
      INDEX id_role_index (id_role),
      FOREIGN KEY (id_role)
      REFERENCES `roles`(id)
);
-- INSERT INTO `users`
-- (name, email, password_hash, id_role)
-- VALUES
-- ("cliente", "cliente@vapeclub.info", "ZHAwR3dyem8yYmczQVBEZDNMckxGdz09", 1),
-- ('Gestor', 'gestor@vapeclub.info', 'a3o4TU0vZHVtNzRCRU1ZaDR4RkowUT09',2),
-- ("Admin", "admin@vapeclubsv.com", "$2y$10$v3RrP8JztdGSVHJb9M5h0OArFW7YYuv/ZOjUc.faBS0hvm4Zh.5QS", 3);

DROP TABLE IF EXISTS `faqs`;
CREATE TABLE IF NOT EXISTS `faqs` (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(250) NOT NULL,
    answer VARCHAR(1000) NOT NULL
);
INSERT INTO `faqs`
(id, question, answer)
VALUES
(1, "¿Cuál es el costo de los e-liquids?", "Los frascos de 30ml cuestan $14 y los de 60ml $25 en concentraciones de 0mg, 3mg, 6mg y 12mg de nicotina. Si deseas una concentración personalizada puedes escribirnos para atender tu solicitud."),
(2,"¿Tienen algún catálogo de sabores?","Sí! Puedes ver el catálogo completo acá http://www.vapeclubsv.com/catalogo."),
(3,"¿Qué porcentajes utilizan en sus bases?","Todos nuestros líquidos vienen preparados en bases 70% VG / 30% PG. Si quieres una mezcla personalizada nos tienes que detallar los valores de VG y PG que deseas y con mucho gusto lo prepararemos. Ten en cuenta que las mezclas personalizadas se demoran 72 horas para estar listas."),
(4,"¿Utilizan endulzantes o edulcorantes en sus líquidos?","El uso de endulzantes en los e-liquid no es malo, siempre y cuando sea en cantidades moderadas. En nuestro caso, el 95% de nuestros productos no utilizan endulzantes ni edulcorantes. Sin embargo, el 5% que sí lo utiliza contiene la cantidad más baja que puedas encontrar en cualquier líquido. Es solo para darle ese “extra boost” que algunos líquidos necesitan para llegar a su punto."),
(5,"¿Cómo puedo adquirir sus productos?","Puedes adquirir nuestros productos directamente en la vape shop VapeCrew, la cual se encuentra ubicada en Merliot (más información en la sección Contacto). También nos puedes escribir vía facebook, WhatsApp o por correo electrónico detallando el sabor y la cantidad que deseas. Una vez realizada la orden nos ponemos de acuerdo para la entrega según los horarios establecidos en el siguiente punto."),
(6,"¿Cuáles son los horarios y lugares de entrega?","Nuestros horarios y lugares de entrega son los siguientes (restricciones aplican):
Lunes a Viernes - 8:00 AM a 8:00 PM
Sábados - 9:30 AM a 11:30 AM y 2:00 PM a 5:00 PM
 La Gran Vía, Santa Elena, Antiguo Cuscatlán, Zona Rosa, Colonia Escalón, zona del Redondel Masferrer, BK de la 75, Centro Comercial San Luis, Constitución*, Centro Comercial Autopista Sur, colonias aledañas al Boulevard de los Próceres, zona Salvador del Mundo, Metrosur, universidades (UCA, UFG, UMA, Matías), Merliot (Plaza Merliot y Mister Donut del platillo), zona Rancho Navarra.
*Depende del lugar. Si tienes dudas sobre otras áreas que no se mencionan arriba, no dudes en escribirnos para consultar."),
(7,"¿Entregan productos en otros lugares que no estén mencionados acá?","Realmente por seguridad de nuestros clientes y también nuestra preferimos hacer entregas en los lugares mencionados arriba ya que son unos de los mas concurridos, céntricos y con mayor presencia de vigilancia."),
(8,"¿Cuánto tiempo se demoran en entregar después de hacer mi pedido?","Normalmente entregamos el mismo día que se recibe la orden. Sin embargo, te recomendamos hacer tu pedido por lo menos un día antes para que lo recibas temprano por la mañana y no te quedes sin líquido mientras esperas."),
(9,"¿Hay algún costo adicional por las entregas?","El costo adicional es de $1 ó $3 en ordenes menores a $14. Todo depende del lugar y la hora en que se haga la entrega."),
(10,"¿Tienen envíos fuera de San Salvador?","Sí. Contamos con envíos a nivel nacional a través de Correos de El Salvador. El costo por este servicio es de $1.25 sin tracking y $2.50 con tracking. El tiempo de entrega dependerá del lugar al que se envíe y puede tomar de 3 a 7 días hábiles. El pago se realiza por Tigo Money, depósito a cuenta del Banco Cuscatlán o Paypal, y se cancela también la comisión que dichos servicios cobran por la transacción (ver el siguiente punto para mas detalles sobre las comisiones).
Por favor ten en cuenta que los tiempos de entrega son un estimado y que nosotros no tenemos control sobre cualquier atraso que pueda tener el servicio de correo. Sin embargo, por previas experiencias que hemos tenido, hemos visto que el promedio de entrega anda entre 3 a 4 días hábiles (basado en paquetes enviados a Santa Ana y San Miguel), pero no es garantizado."),
(11,"¿Cuál es la comisión que cobran Tigo Money y Paypal?","En el caso de Tigo Money es del 4% sobre el total a depositar. Por ejemplo, si el valor a pagar es de $14, tendrás que depositar $14.56 para cubrir la comisión que será de $0.56. Te recomendamos consultar acá para cualquier duda que tengas sobre esta opción http://tigomoney.com.sv/faqs. En cuanto a Paypal la comisión es del 9%. Es decir por ejemplo que si pagas $14, el total a pagar sería $15.26 ($14 + 9% ($1.26)."),
(12,"¿Ofrecen descuento al comprar varios frascos de E-liquid o bastante cantidad de líquido?","En vista de que nuestro producto ya tiene un precio bastante bajo, nos es imposible reducirlo aún más. Sin embargo, premiamos tu preferencia y lealtad con nuestra tarjeta de cliente frecuente, la cual te premia con líquido gratis al llenarla. Puedes obtener más información sobre dicha tarjeta acá http://card.vapeclubsv.com/."),
(13,"¿Tienen venta al por mayor para reventa?","Actualmente estamos trabajando para poder ofrecer dicha opción pronto.");

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(25) NOT NULL,
    description VARCHAR(150) NOT NULL,
    imageURL VARCHAR(250) DEFAULT NULL
);
INSERT INTO `categories`
(id, name, description, imageURL)
VALUES
(1, "Mentolados", "Deliciosas mezclas mentoladas.", "http://localhost:80/vape-club-backend/src/images/categoria_1.jpg"),
(2, 'Frutales', 'Las mejores combinaciones frutales que puedas encontrar', "http://localhost:80/vape-club-backend/src/images/categoria_2.jpg"),
(3, "Reposteria", "Sabores de reposteria y cereales", "http://localhost:80/vape-club-backend/src/images/categoria_3.jpg"),
(4, "Bebidas y dulces","Buscas sabores a bebidas y dulces?", "http://localhost:80/vape-club-backend/src/images/categoria_4.jpg"),
(5, "Tabaquiles", "Si tu gusto por el tabaco se mantiene aun con el vapeo.", "http://localhost:80/vape-club-backend/src/images/categoria_5.jpg");

DROP TABLE IF EXISTS `materials`;
CREATE TABLE IF NOT EXISTS `materials` (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(25) NOT NULL,
    description VARCHAR(150) NOT NULL,
    cost INT(10) NOT NULL
);
INSERT INTO `materials`
(id, name, description, cost)
VALUES
(1, "Glicerina 3g", "Glicerina, 3g", 1),
(2, "Nicotina 1g", "Nicotina, 1g", 1),
(3, "Sabor menta", "Sabor e-liquid menta, 3g", 1),
(4, "Sabor fresa", "Sabor e-liquid fresa, 3g", 1),
(5, "Sabor kiwi", "Sabor e-liquid kiwi, 3g", 1),
(6, "Sabor papaya", "Sabor e-liquid papaya, 3g", 1),
(7, "Sabor blueberry", "Sabor e-liquid blueberry, 3g", 1),
(8, "Sabor tabaco", "Sabor e-liquid tabaco, 3g", 1),
(9, "Sabor crema", "Sabor e-liquid crema, 3g", 1),
(10, "Sabor maracuya", "Sabor e-liquid maracuya, 3g", 1),
(11, "Sabor mango", "Sabor e-liquid mango, 3g", 1),
(12, "Sabor piña", "Sabor e-liquid piña, 3g", 1),
(13, "Sabor guayaba", "Sabor e-liquid guayaba, 3g", 1),
(14, "Sabor coco", "Sabor e-liquid coco, 3g", 1),
(15, "Sabor melon", "Sabor e-liquid melon, 3g", 1),
(16, "Sabor melocoton", "Sabor e-liquid melocoton, 3g", 1),
(17, "Sabor cereza", "Sabor e-liquid cereza, 3g", 1),
(18, "Sabor chocolate", "Sabor e-liquid chocolate, 3g", 1),
(19, "Sabor vainilla", "Sabor e-liquid vainilla, 3g", 1),
(20, "Sabor galletas", "Sabor e-liquid galletas, 3g", 1),
(21, "Sabor cola", "Sabor e-liquid cola, 3g", 1);

DROP TABLE IF EXISTS `flavors`;
CREATE TABLE IF NOT EXISTS `flavors` (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(25) NOT NULL,
    description VARCHAR(150) NOT NULL,
    imageURL VARCHAR(250) DEFAULT NULL,
    id_category INT UNSIGNED NOT NULL,
      INDEX id_category_index (id_category),
      FOREIGN KEY (id_category)
      REFERENCES `categories`(id)
);
INSERT INTO `flavors`
(id, name, description, id_category)
VALUES
(1, "Blueberry Ice", "Frescos blueberries con un suave toque de mentol.", 1),
(2, "Strawberry Ice", "Dulces fresas con un suave toque de mentol.", 1),
(3, "Kiwiberry Sweet", "Kiwi con fresas levemente cremosas y un pequeño toque de mentol que crea una experiencia de sabor única.", 1),
(4, "Dragon's Soul","Deliciosa combinacion de fresas con pitahaya <fruto del dragon> y suave toque de mentol.", 1),
(5, "Kringle", "Deliciosa menta con hierbabuena y mentol.", 1),
(6, "Extreme Ice", "Nuestro mentol mas fuerte. Ideal para crear tus propias combinaciones o para consumo individual si eres amante de la frescura extrema.", 1),
(7, "Gravity", "Deliciosa menta con frutas.", 1),
(8, "Typhoon","Perfecta combinacion de papaya, melocoton y guayaba.",2),
(9, "Sunset","Maracuya, piña, kiwi y coco que contrastan de manera perfecta.",2),
(10, "Tropical Sin","Estupenda combinación de frutas tropicales mango, piña, papaya y kiwi.",2),
(11, "Lava Shot","Fresas con piña y coco acompañados de un gentil toque de crema para complementar esta deliciosa mezcla.",2),
(12, "Kiwi Cherry Cream","Perfecta combinacion de kiwi con cereza",2),
(13, "Mega Melon","Mango y melón con un suave toque de papaya que crean una exquisita combinación de frutas tropicales.",2),
(14, "Berry Mixed","Perfecta combinación de frutos berry.",2),
(15, "Cheesecake Redemption","Delicioso cheesecake acompañado con jalea de fresa.",3),
(16, "Cookies & Cream","Galletas de chocolate con crema de vainilla.",3),
(17, "Strawberry Cream","Deliciosas fresas dulces con una mezcla de crema pastelera sobre una base de vainilla.",3),
(18, "Berry Crunchy","Cereal frutal estilo Captain Crunch.",3),
(19, "KYB","Deliciosa combinación de Whiskey Bourbon con semillas de almendra tostada.",4),
(20, "Cherry Cola","Sabor a dulce de cola con un toque de cereza.",4),
(21, "Black & Green","Refrescante sabor a bebida cítrica estilo Mountain Dew.",4),
(22, "Jagerbomb","Cominación de Jager y Red Bull.",4),
(23, "Mojito","Sabor refrescante con notas dulces y cítricas.",4),
(24, "Rain of Colors","Combinación de dulces Skittles.",4),
(25, "Energy Drink","Bebida energética estilo Red Bull.",4),
(26, "Horchata","Increíble sabor a horchata que disfrutarás en cada calada.",4),
(27, "Tribek","Deliciosa combinación única de tabaco con vainilla y caramelo.",5),
(28, "Cowboy Tobacco","Sabor a cigarrillos rojos.",5),
(29, "Tobacco Mint","Mismo Cowboy Tobacco con un toque mentolado.",5),
(30, "Cuban Cigar","Excelente alternativa para los amantes del habano y del tabaco estilo cubano.",5),
(31, "Tobacco Chill","Tabaco con chocolate y un toque de frescura.",5);

DROP TABLE IF EXISTS `flavors_materials`;
CREATE TABLE IF NOT EXISTS `flavors_materials` (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    amount INT NOT NULL, 
    id_flavor INT UNSIGNED NOT NULL,
      INDEX id_flavor_index (id_flavor),
      FOREIGN KEY (id_flavor)
      REFERENCES `flavors`(id),
    id_material INT UNSIGNED NOT NULL,
      INDEX id_material_index (id_material),
      FOREIGN KEY (id_material)
      REFERENCES `materials`(id)
);
INSERT INTO `flavors_materials`
(amount, id_flavor, id_material)
VALUES 
(1, 1, 3),
(1, 1, 7),
(1, 2, 3),
(1, 2, 4),
(1, 3, 3),
(1, 3, 5),
(1, 3, 9),
(1, 8, 6),
(1, 8, 16),
(1, 8, 13),
(1, 16, 19),
(1, 16, 18),
(1, 20, 21),
(1, 20, 17),
(1, 28, 8),
(1, 28, 8);

DROP TABLE IF EXISTS `presentations`;
CREATE TABLE IF NOT EXISTS `presentations` (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(25) NOT NULL,
    description VARCHAR(150) NOT NULL,
    imageURL VARCHAR(250) DEFAULT NULL,
    price INT(10) NOT NULL,
    cost INT(10) NOT NULL
);
INSERT INTO `presentations`
(id, name, description, imageURL, price, cost)
VALUES
(1, "30ml", "Nuestra presentación standard ha evolucionado y ahora viene en un frasco plástico que incluye gotero con punta fina y proteccion para niños.","http://localhost:80/vape-club-backend/src/images/catalogo_1.jpg", 14, 1),
(2, "30ml", "Práctica y portatil presentación en botes Chubby Gorilla 100% originales. Tu mejor opción si cuentas con poco espacio para transportarlo.","http://localhost:80/vape-club-backend/src/images/catalogo_2.jpg", 15, 2),
(3, "60ml", "¿30ml no son suficientes para tu gusto? Nuestra presentación de 60ml en botes Chubby Gorilla es entonces tu mejor opción!","http://localhost:80/vape-club-backend/src/images/catalogo_3.jpg", 25, 3);

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_flavor INT UNSIGNED NOT NULL,
      INDEX id_flavor_index (id_flavor),
      FOREIGN KEY (id_flavor)
      REFERENCES `flavors`(id),
    id_presentation INT UNSIGNED NOT NULL,
      INDEX id_presentation_index (id_presentation),
      FOREIGN KEY (id_presentation)
      REFERENCES `presentations`(id)
);

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ordered_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_user INT UNSIGNED NOT NULL,
      INDEX id_user_index (id_user),
      FOREIGN KEY (id_user)
      REFERENCES `users`(id)
);

DROP TABLE IF EXISTS `orders_details`;
CREATE TABLE IF NOT EXISTS `orders_details` (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    amount INT(10) NOT NULL, 
    id_order INT UNSIGNED NOT NULL,
      INDEX id_order_index (id_order),
      FOREIGN KEY (id_order)
      REFERENCES `orders`(id),
    id_product INT UNSIGNED NOT NULL,
      INDEX id_product_index (id_product),
      FOREIGN KEY (id_product)
      REFERENCES `products`(id)
);