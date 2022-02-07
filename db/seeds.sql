INSERT INTO department (department_name)
VALUES
('P&C'),
('Station'),
('T-Line'),
('Storeroom');

INSERT INTO roles (title, salary, department_id)
VALUES
('Station Electrician', 80000, 2),
('Station Servicer', 90000, 2),
('Station Manager', 130000, 2),
('P&C Tech', 100000, 1),
('Engineer', 110000, 1),
('P&C Manager', 140000, 1),
('Lineman', 80000, 3),
('T-Line Manager', 120000, 3),
('Attendant', 60000, 4),
('Storeroom Manager', 110000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Joey', 'Perez', 1, 4),
('Trey', 'Hall', 2, 4),
('Karl', 'Kaiser', 1, 4),
('Ismael', 'Valadez', 3, 0),
('Crystal', 'Devos', 5, 7),
('Mark', 'Ramos', 4, 7),
('Joe', 'Garza', 6, 0),
('Tom', 'Hill', 7, 9),
('Jimmy', 'Emmerit', 8, 0),
('Roger', 'Moore', 9, 12),
('Bill', 'Duvall', 9, 12),
('Nancy', 'Hutton', 10, 0);
