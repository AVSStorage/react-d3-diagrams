import { nanoid } from 'nanoid'
function Sidebar({ addNode, mode, changeMode, zoomIn, zoomOut, changeLayoutStatic }) {
    return (
        <div className="d-flex flex-column">
            <p>Режим: {mode}</p>
            <button style={mode === 'Перемещение' ? {backgroundColor: 'green'} : {} } onClick={() => {
                changeMode('Перемещение')
                changeLayoutStatic(false)
            }}>Переместить</button>
            <button style={mode === 'Добавление' ? {backgroundColor: 'green'} : {} } onClick={() => {
                changeMode('Добавление')
              //  changeLayoutStatic(true)
                addNode(state => ({
                    links: [...state.links],
                    nodes: [...state.nodes, {
                    id: nanoid(),
                    x: Math.random() * 1440 - 270,
                    y: Math.random() * 800 - 300,
                    lesson: 4,
                    hours: 2,
                    tasks: 10,
                    title: 'Тема ' + (state.nodes.length + 1),
                    description: `Уравнения 
  математической 
  физики в частных 
  производных второго порядка`
                }]
                })
                
            )
            }
            }>Добавить тему</button>
            <button style={mode === 'Создание связи' ? {backgroundColor: 'green'} : {} } onClick={() => {
                changeMode('Создание связи')
                changeLayoutStatic(true)
            }}>Cоздать связь</button>
            <button  style={mode === 'Удаление' ? {backgroundColor: 'green'} : {} } onClick={() => {
                  changeMode('Удаление')
            }}>Удалить</button>
            <button onClick={() => {
                zoomIn()
            }}>+</button>
            <button onClick={() => {
                zoomOut()
            }}>-</button>
        </div>
    )
}

export default Sidebar;