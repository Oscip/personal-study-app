export default function Modal({ isOpen, onClose, rest}) {
    if (!isOpen) return null;
    return(
        <div onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose}>&times;</button>
                {rest}
            </div>
        </div>
    )
}