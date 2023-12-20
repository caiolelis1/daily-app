interface ButtonProps {
  text: string;
}

const Button = ({ text }: ButtonProps) => {
  return <button className="bg-black text-white uppercase">{text}</button>;
};

export default Button;
