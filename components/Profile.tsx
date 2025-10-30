import React, { useEffect, useRef, useState } from 'react';


export default function Profile() {
  ;
  const [editing, setEditing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setPreview((old) => {
      if (old) URL.revokeObjectURL(old);
      return url;
    });
    // Persist upload to server if desired
  }



  return (
    <section aria-label="Your profile" style={{ padding: 12 }}>
      <h3>Your profile</h3>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: 8, overflow: 'hidden', background: 'var(--track)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {preview ? (
            <img src={preview} alt="Profile preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ color: 'var(--select-stroke)' }}>👤</div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button onClick={() => setEditing((s) => !s)} aria-expanded={editing} style={{ padding: '8px 12px', borderRadius: 6 }}>
            {editing ? 'Close editor' : 'Edit your profile'}
          </button>

          {editing && (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={onFileChange}
                aria-label="Upload profile picture"
              />
              <button onClick={() => fileRef.current?.click()} style={{ padding: '8px 10px', borderRadius: 6 }}>
                Choose file
              </button>
              <button
                onClick={() => { /* TODO: send preview to server */ setEditing(false); }}
                style={{ padding: '8px 10px', borderRadius: 6 }}
              >
                Save
              </button>
            </div>
          )}

          
        </div>
      </div>
    </section>
  );
}
