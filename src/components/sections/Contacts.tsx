"use client";
import Section from "@/components/Section";
import { useT } from "@/context/LanguageProvider";

export default function Contacts() {
  const t = useT();
  return (
    <Section id="contacts" title={t("contacts_title")} subtitle={t("contacts_sub")}>
      <form className="sr-item grid gap-3 sm:max-w-md"
        onSubmit={(e) => { e.preventDefault(); alert("👌"); }}>
        <input className="rounded-xl px-4 py-2 ring-1 bg-transparent"
               style={{ borderColor: "var(--ring)" }} placeholder={t("form_name")} />
        <input type="email" className="rounded-xl px-4 py-2 ring-1 bg-transparent"
               style={{ borderColor: "var(--ring)" }} placeholder={t("form_email")} />
        <textarea rows={4} className="rounded-xl px-4 py-2 ring-1 bg-transparent"
                  style={{ borderColor: "var(--ring)" }} placeholder={t("form_msg")} />
        <button className="btn btn-solid w-fit">{t("form_send")}</button>
      </form>
    </Section>
  );
}
