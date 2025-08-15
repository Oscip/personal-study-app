export default function FilterTasks() {
    return (
        <>
            <div className="div-width">
                <div className="task-header">
                    <div className="left-panel">
                        <p className="task-header-text">Completed</p>
                    </div>
                    <div className="toDoItemContent">
                        <div className="arrow-filter-container">
                            <p className="task-header-text">Description</p>
                            <div className="select-arrow-filter"></div>
                        </div>
                        <div className="arrow-filter-container-category">
                            <p className="task-header-text">Category</p>
                            <div className="select-arrow-filter"></div>
                        </div>
                    </div>
                </div>
            </div>
            <p className="spanLine"/>
        </>
    )
}