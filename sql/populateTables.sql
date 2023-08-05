INSERT INTO "users"
	("username", "password", "admin")
VALUES
	('cauan', '1234', DEFAULT),
	('andy', '1234', TRUE)
RETURNING *;



INSERT INTO "playlists"
	("name", "privacy", "description", "userID")
VALUES
	('rock emo 2000', 'private', NULL, 1),
	('m3-demos', DEFAULT, 'playlist atualizada do m3', 1)
RETURNING *;



INSERT INTO "musics"
	("name", "author", "album")
VALUES
	('Camisa 10', 'Turma do Pagode', 'Esse é o Clima'),
	('Quem é Ela', 'Zeca Pagodinho', NULL),
	('Tá Vendo Aquela Lua', 'Exaltasamba', NULL),
	('Evanescence', 'Going Under', 'Fallen'),
	('Decode', 'Paramore', NULL),
	('Nobody''s Home', 'Avril Lavingne', NULL)
RETURNING *;



INSERT INTO "music_playlists"
	("musicID", "playlistID")
VALUES
	(1, 2), (2, 2), (3, 2),
	(4, 1), (5, 1), (6, 1)
RETURNING *;