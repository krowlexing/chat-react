interface Props {
    value: string,
    onValue: (newValue: string) => void
}

export function Input(props: Props) {
    const { value, onValue: setValue } = props;

    return (
    <div>
        <input value={value} onChange={e => setValue(e.target.value)}/>
    </div>
    )
}