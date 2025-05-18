
// This is just a helper file to document the issue that needs fixing
// with signInWithPassword in Supabase auth implementation

/*
Issue: Email + password login throws 400 error
Fix needed in AuthContext.tsx:

Replace:

```
const { error } = await supabase.auth.signInWithPassword({
  email,
  password
});
```

With:

```
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
  options: {
    emailRedirectTo: window.location.origin
  }
});

if (data?.user) {
  // Set session/user state
}
```

Also verify in Supabase dashboard that:
1. Email auth is enabled
2. The password column in auth.users has values
3. Email confirmation is not mandatory
*/
