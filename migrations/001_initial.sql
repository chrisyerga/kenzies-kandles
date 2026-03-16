CREATE TABLE IF NOT EXISTS products (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(255)   NOT NULL,
  price       NUMERIC(10,2)  NOT NULL,
  sale_price  NUMERIC(10,2),
  description TEXT           NOT NULL DEFAULT '',
  scents      TEXT[]         NOT NULL DEFAULT '{}',
  in_stock    BOOLEAN        NOT NULL DEFAULT true,
  image       VARCHAR(500),
  wax_color   VARCHAR(255)   NOT NULL DEFAULT '',
  bg_glow     VARCHAR(255)   NOT NULL DEFAULT '',
  tag_color   VARCHAR(255)   NOT NULL DEFAULT '',
  tag_bg      VARCHAR(255)   NOT NULL DEFAULT '',
  sort_order  INTEGER        NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contacts (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(255) NOT NULL,
  email      VARCHAR(255) NOT NULL,
  message    TEXT         NOT NULL,
  read       BOOLEAN      NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
