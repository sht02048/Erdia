import { redirect } from "next/navigation";

import { pathKeys } from "@/shared/config";

export default function Home() {
  redirect(pathKeys.upload);
}
