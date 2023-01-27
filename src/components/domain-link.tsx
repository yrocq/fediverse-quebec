import punycode from 'punycode/';

type Props = {domain: string}

const DomainLink = (props: Props) => (
    <a href={`https://${props.domain}`}>
    {punycode.toUnicode(props.domain)}
  </a>
)

export default DomainLink;