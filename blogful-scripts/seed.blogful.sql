BEGIN;

INSERT INTO blogful_articles (title, date_published, content)
VALUES
    ('Into the Unknown', now() - '23 days':: INTERVAL, 'Frozen I'),
    ('For the First Time in Forever', now() - '24 days':: INTERVAL, 'Frozen I'),
    ('Frozen Heart', now() - '21 days':: INTERVAL, 'Frozen'),
    ('Fixer Upper', now() - '22 days':: INTERVAL, 'Frozen'),
    ('Do you want to build a Snowman?', now() - '24 days':: INTERVAL, 'Frozen'),
    ('In Summer', now() - '22 days':: INTERVAL, 'Frozen'),
    ('Love is an Open Door', now() - '22 days':: INTERVAL, 'Frozen'),
    ('Show Yourself', now() - '21 days':: INTERVAL, 'Frozen II song'),
    ('Reflection', now() - '3 days':: INTERVAL, 'Mulan song'),
    ('Colors of the Wind', now() - '3 days':: INTERVAL, 'Pocahantus'),
    ('Just around the Riverbend', now() - '2 days':: INTERVAL, 'Pocahantus'),
    ('Savages', now() - '2 days':: INTERVAL, 'Pocahantus'),
    ('I can go the Distance', now() - '1 days':: INTERVAL, 'Hercules'),
    ('Zero to Hero', now() - '5 days':: INTERVAL, 'Hercules'),
    ('I wont say Im in Love', now() - '5 days':: INTERVAL, 'Hercules'),
    ('The Gospel Truth', now() - '10 days':: INTERVAL, 'Hercules'),
    ('Part of Your World', now() - '10 days':: INTERVAL, 'Little Mermaid'),
    ('Under The Sea', now() - '11 days':: INTERVAL, 'Little Mermaid'),
    ('Poor Unforunate Souls', now() - '12 days':: INTERVAL, 'Little Mermaid'),
    ('Kiss the Girl', now() - '7 days':: INTERVAL, 'Little Mermaid')
;

COMMIT;