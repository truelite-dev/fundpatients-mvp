-- Request-help submissions (phase 1) only collect the financial goal and
-- requester contact info; title/story come from a later wizard step that's
-- deferred pending the Figma spec. A pending case can exist without them —
-- an admin fills these in (or the requester does, in a later phase) before
-- the case is published. Published cases still need a title/description in
-- practice, just not enforced at the DB layer yet.
alter table cases alter column title drop not null;
alter table cases alter column description drop not null;
