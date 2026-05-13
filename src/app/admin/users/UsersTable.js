"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UsersTable({ users, currentUserId }) {
  const router = useRouter();
  const [updating, setUpdating] = useState(null);
  const [error, setError] = useState(null);

  async function changeRole(userId, newRole) {
    if (userId === currentUserId) {
      setError("No pots canviar el teu propi rol.");
      return;
    }
    setUpdating(userId);
    setError(null);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error");
      }
      router.refresh();
    } catch (e) {
      setError(e.message);
    } finally {
      setUpdating(null);
    }
  }

  return (
    <>
      {error && (
        <p
          role="alert"
          className="mb-4 text-sm font-medium bg-primary/10 text-primary px-4 py-3 rounded-lg"
        >
          {error}
        </p>
      )}

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-background-soft">
            <tr className="text-left">
              <Th>Nom / Email</Th>
              <Th>Rol</Th>
              <Th>Comentaris</Th>
              <Th>Registrat</Th>
              <Th>Accions</Th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-border">
                <Td>
                  <strong>{u.name || "(sense nom)"}</strong>
                  <p className="text-xs text-muted">{u.email}</p>
                  {u.id === currentUserId && (
                    <span className="text-xs text-accent">(tu)</span>
                  )}
                </Td>
                <Td>
                  <RoleBadge role={u.role} />
                </Td>
                <Td>{u._count.comments}</Td>
                <Td className="text-xs text-muted">
                  {new Date(u.createdAt).toLocaleDateString("ca-ES")}
                </Td>
                <Td>
                  <select
                    value={u.role}
                    onChange={(e) => changeRole(u.id, e.target.value)}
                    disabled={u.id === currentUserId || updating === u.id}
                    className="bg-background border border-border rounded-md px-2 py-1 text-xs disabled:opacity-50"
                  >
                    <option value="USER">USER</option>
                    <option value="EDITOR">EDITOR</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Th({ children }) {
  return (
    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted">
      {children}
    </th>
  );
}
function Td({ children, className = "" }) {
  return <td className={`px-4 py-3 align-top ${className}`}>{children}</td>;
}

function RoleBadge({ role }) {
  const styles = {
    ADMIN: "bg-primary/15 text-primary",
    EDITOR: "bg-accent/15 text-accent",
    USER: "bg-background-soft text-muted",
  };
  return (
    <span
      className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${styles[role]}`}
    >
      {role}
    </span>
  );
}
