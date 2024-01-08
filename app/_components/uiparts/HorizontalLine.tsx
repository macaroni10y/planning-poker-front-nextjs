interface Props {
	innerText?: string;
}

const HorizontalLine = (props: Props) => (
	<div className="flex items-center justify-center w-full">
		<div className="mx-2 h-1 w-full border-b border-b-gray-300 flex justify-center" />
		<div className="mx-1 text-gray-400">{props.innerText}</div>
		<div className="mx-2 h-1 w-full border-b border-b-gray-300 flex justify-center" />
	</div>
);

export default HorizontalLine;
