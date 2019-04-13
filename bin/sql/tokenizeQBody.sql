CREATE FUNCTION documents_search_trigger() RETURNS trigger AS $$
begin
  new.token :=
    setweight(to_tsvector(coalesce(new.body,'')), 'A');
  return new;
end
$$ LANGUAGE plpgsql;

CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
ON question FOR EACH ROW EXECUTE PROCEDURE documents_search_trigger();
