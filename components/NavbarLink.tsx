import classNames from "classnames";
import Link from "next/link";

interface Props {
  label: string;
  href: string;
  className?: string;
}

export default function NavbarLink(props: Props) {
  return (
    <Link href={props.href}>
      <a className={classNames("font-barlow", props.className)}>
        {props.label}
      </a>
    </Link>
  );
}
