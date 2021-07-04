import { useState } from "react";
import { Graph } from "react-d3-graph";
import image from './image.png'
import Sidebar from "./Sidebar";
// graph payload (with minimalist structure)
const data = {
  nodes: [{ id: "Harry", 
  lessons: 5, tasks: 4, hours: 2,title: 'Тема 1',selected: false, description: `Уравнения 
  математической 
  физики в частных 
  производных второго порядка` }, { id: "Sally", selected: false, lessons: 5, tasks: 4, hours: 2,title: 'Тема 2', description: `Уравнения 
  математической 
  физики в частных 
  производных второго порядка` }, { id: "Alice", selected: false, lessons: 5, tasks: 4, hours: 2,title: 'Тема 3', description: `Уравнения 
  математической 
  физики в частных 
  производных второго порядка` },
{ id: "3", lessons: 5, tasks: 4, hours: 2,title:  'Тема 1',selected: false, description: `Уравнения 
математической 
физики в частных 
производных второго порядка`,  x: 300, y: 200}],
  links: [
    { source: "Harry", 
    color: "red",
    
    labelProperty: 'Тема 1 -> Тема 2', target: "Sally", markerHeight: 150, markerWidth: 150 },
    { source: "Harry", target: "Alice", markerWidth: 150, color: "green" },
  ],
};


const ViewComponent = (data) => {

  return (
    <article style={{
      zIndex: 100,
      backgroundColor: 'white',
      border: data.selected ? '1px solid': '',
      borderRadius: '20px', boxShadow: '0px 10px 15px 5px rgba(197, 197, 197, 0.25)', color: 'black'}}>
        <header style={{display: 'flex', justifyContent: 'space-around'}}>
            <p style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                <span style={{fontSize: '14px', color: '#959595'}}>Занятий</span>
                <strong>{data.lessons}</strong>
            </p>
            <p style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                <span style={{fontSize: '14px', color: '#959595'}}>Задач</span>
                <strong>{data.tasks}</strong>
            </p>
            <p style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                <span style={{fontSize: '14px', color: '#959595'}}>Часов</span>
                <strong>{data.hours}</strong>
            </p>
        </header>
        <h4 style={{fontSize: '24px', marginBottom: 0, marginTop: '0px', textAlign: 'start', paddingLeft: '25px'}}>{data.title}</h4>
        <p style={{fontSize: '20px', lineHeight: '24px', textAlign: 'start', paddingLeft: '25px', fontWeight: 400}}>
          {data.description}
        </p>
      </article>
  );
}

// the graph configuration, just override the ones you need
const myConfig = {
  automaticRearrangeAfterDropNode: false,
  collapsible: false,
  height: 800,
  directed: true,
  highlightDegree: 1,
  highlightOpacity: 0.2,
  linkHighlightBehavior: true,
  maxZoom: 6,
  minZoom: 1,
  initialZoom: 1,
  nodeHighlightBehavior: false,
  panAndZoom: false,
  staticGraph: false,
  width: 1440,
  d3: {
    linkLength: 400,
    gravity: -400,
    disableLinkForce: false
  },
  node: {
    color: "#d3d3d3",
    fontColor: "black",
    fontSize: 12,
    fontWeight: "normal",
    highlightColor: "red",
    highlightFontSize: 12,
    highlightFontWeight: "bold",
    highlightStrokeColor: "SAME",
    highlightStrokeWidth: 1.5,
    // labelClass: "person-node-label",
    mouseCursor: "pointer",
    opacity: 1,
    renderLabel: false,
    size: {
      width: 3000,
      height: 2400,
    },
    strokeColor: "none",
    strokeWidth: 1.5,
    svg: image,
    symbolType: "square",
    viewGenerator: function(node) { 
      return <ViewComponent {...node} />
    }
  },
  link: {
    color: "#d3d3d3",
    opacity: 1,
    type: 'CURVE_SMOOTH',
    strokeLinecap: 'square',
    semanticStrokeWidth: false,
    strokeWidth: 4,
    highlightColor: "blue",
  }
};

const onClickNode = function(nodeId, addNode, selectNode, selectedNodes) {
  if (selectedNodes.length === 1) {

    addNode(state => ({
      nodes: [...state.nodes],
      links: [...state.links, {
        source: selectedNodes[0],
        target: nodeId,
        color: 'blue'
      }]
    }))
    selectNode([])
    addNode(state => {
      const nodes = state.nodes.map(node => { return node.id === selectedNodes[0] ? {...node, selected: false} : node})
      return {
        nodes,
        links: state.links
      }
    })
  
   
    return;
  } 
  addNode(state => {
    const nodes = state.nodes.map(node => { return node.id === nodeId ? {...node, selected: true} : node})
    return {
      nodes,
      links: state.links
    }
  })
  selectNode([...selectedNodes, nodeId]);
  window.alert(`Clicked node ${nodeId}`);
};

const onClickLink = function(source, target, addNode) {
  const result = window.confirm('Вы хотите удалить эту связь?');
  if (result) {
    addNode(state => ({
      links: state.links.filter(link => link.source !== source && link.target !== target),
      nodes: state.nodes
    }))
  }
};

function Diagram() {
  const [nodes, addNode] = useState(data)
  const [mode, changeMode] = useState('Перемещение')
  const [selectedNodes, selectNode] = useState([])
  const [config, changeConfig ] = useState(myConfig)
 return (
 <>
 <Sidebar changeMode={changeMode} mode={mode} addNode={addNode} zoomIn={() => {
      changeConfig(state => ({...state, staticGraph:true }))

   changeConfig(state => ({...state, initialZoom: state.initialZoom + 0.1 }))
   changeConfig(state => ({...state, staticGraph: false }))

 }}
 changeLayoutStatic={(isStatic) => {
  changeConfig(state => ({...state, staticGraph:isStatic }))
 }}
 zoomOut={() => {
  changeConfig(state => ({...state, initialZoom: state.initialZoom - 0.1 }))
}}
 />
 <Graph
  id="graph-id" // id is mandatory
  data={nodes}
  config={config}
  onClickNode={(props) => {
    if (mode === 'Создание связи') {
    onClickNode(props, addNode, selectNode, selectedNodes,  () => changeConfig(state => ({...state, staticGraph:false })))
    } else if (mode === 'Удаление') {
      
      const node = nodes.nodes.find(node => node.id === props)
      const result = window.confirm('Вы хотите удалить '+node.title+'?');
      if (result) {
        addNode(state => ({
          links: state.links.filter(link => link.source !== props && link.target !== props),
          nodes: state.nodes.filter(node => node.id !== props)
        }))
      }
    }
  }}
  onClickLink={(source, target) => onClickLink(source,target,addNode  )}
/></>)
}

export default Diagram;