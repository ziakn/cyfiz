"use client";

import { createContext, useContext, type ReactNode } from "react";
import { NO_PERMS, type ModulePerms, type PermissionMap } from "@/lib/permissions";

const Ctx = createContext<PermissionMap>({});

export function AdminPermissionsProvider({ value, children }: { value: PermissionMap; children: ReactNode }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** What the current admin may do in a module. The server enforces this too; this only hides controls. */
export function useModulePerms(module: string): ModulePerms {
  const map = useContext(Ctx);
  const p = map[module];
  return p && p.view ? p : { ...NO_PERMS };
}
