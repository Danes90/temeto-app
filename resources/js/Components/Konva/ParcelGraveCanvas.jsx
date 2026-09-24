import { Group, Layer, Rect, Stage, Text, Transformer } from 'react-konva';
import { useEffect, useRef, useState } from 'react';

/**
 * Parcella-szintű térkép. A meglévő sírokat téglalapként rajzolja ki,
 * kijelöléskor Transformer-rel mozgathatók/átméretezhetők/forgathatók
 * (a prototípus "épület" eszközének + Transformer-ének mintájára).
 * drawMode alatt húzással ("drag to draw") lehet új sírt kijelölni.
 */
export default function ParcelGraveCanvas({
    graves,
    drawMode,
    selectedGraveId,
    onFinishDrawing,
    onSelectGrave,
    onUpdateGrave,
}) {
    const wrapperRef = useRef(null);
    const trRef = useRef(null);
    const shapeRefs = useRef({});
    const [size, setSize] = useState({ width: 800, height: 600 });
    const [drawStart, setDrawStart] = useState(null);
    const [newRect, setNewRect] = useState(null);

    useEffect(() => {
        const updateSize = () => {
            if (wrapperRef.current) {
                setSize({
                    width: wrapperRef.current.clientWidth,
                    height: wrapperRef.current.clientHeight,
                });
            }
        };

        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    useEffect(() => {
        if (!trRef.current) {
            return;
        }

        const node = selectedGraveId ? shapeRefs.current[selectedGraveId] : null;
        trRef.current.nodes(node ? [node] : []);
        trRef.current.getLayer()?.batchDraw();
    }, [selectedGraveId, graves]);

    const handleMouseDown = (e) => {
        if (!drawMode || e.target !== e.target.getStage()) {
            return; // csak üres területre lehet új sírt rajzolni
        }

        const pos = e.target.getStage().getPointerPosition();
        setDrawStart(pos);
        setNewRect({ x: pos.x, y: pos.y, width: 0, height: 0 });
    };

    const handleMouseMove = (e) => {
        if (!drawMode || !drawStart) {
            return;
        }

        const pos = e.target.getStage().getPointerPosition();
        setNewRect({
            x: Math.min(drawStart.x, pos.x),
            y: Math.min(drawStart.y, pos.y),
            width: Math.abs(pos.x - drawStart.x),
            height: Math.abs(pos.y - drawStart.y),
        });
    };

    const handleMouseUp = () => {
        if (!drawMode || !newRect) {
            return;
        }

        if (newRect.width > 5 && newRect.height > 5) {
            onFinishDrawing(newRect);
        }

        setDrawStart(null);
        setNewRect(null);
    };

    return (
        <div ref={wrapperRef} className="h-full w-full">
            <Stage
                width={size.width}
                height={size.height}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onClick={(e) => {
                    if (!drawMode && e.target === e.target.getStage()) {
                        onSelectGrave(null);
                    }
                }}
                className={drawMode ? 'cursor-crosshair' : 'cursor-default'}
            >
                <Layer>
                    {graves.map((grave) => (
                        <Group
                            key={grave.id}
                            ref={(node) => {
                                shapeRefs.current[grave.id] = node;
                            }}
                            x={grave.x}
                            y={grave.y}
                            rotation={grave.rotation || 0}
                            draggable={!drawMode}
                            onClick={() => !drawMode && onSelectGrave(grave)}
                            onDragEnd={(e) => onUpdateGrave(grave, { x: e.target.x(), y: e.target.y() })}
                            onTransformEnd={(e) => {
                                const node = e.target;
                                const scaleX = node.scaleX();
                                const scaleY = node.scaleY();

                                // a méretet a szélesség/magasság mezőkbe visszük át,
                                // a skálázást pedig visszaállítjuk 1-re
                                node.scaleX(1);
                                node.scaleY(1);

                                onUpdateGrave(grave, {
                                    x: node.x(),
                                    y: node.y(),
                                    width: Math.max(5, grave.width * scaleX),
                                    height: Math.max(5, grave.height * scaleY),
                                    rotation: node.rotation(),
                                });
                            }}
                        >
                            <Rect
                                width={grave.width}
                                height={grave.height}
                                fill={grave.deceased_count > 0 ? '#c9b48c' : '#e8dfc8'}
                                stroke={selectedGraveId === grave.id ? '#1976d2' : '#7a6a4f'}
                                strokeWidth={selectedGraveId === grave.id ? 3 : 1.5}
                            />
                            <Text
                                text={grave.label}
                                width={grave.width}
                                height={grave.height}
                                align="center"
                                verticalAlign="middle"
                                fontSize={11}
                                fill="#3a3120"
                                listening={false}
                            />
                        </Group>
                    ))}

                    {newRect && (
                        <Rect
                            x={newRect.x}
                            y={newRect.y}
                            width={newRect.width}
                            height={newRect.height}
                            stroke="#1976d2"
                            dash={[6, 4]}
                            fill="rgba(25, 118, 210, 0.15)"
                        />
                    )}

                    {!drawMode && (
                        <Transformer
                            ref={trRef}
                            rotateEnabled
                            enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
                        />
                    )}
                </Layer>
            </Stage>
        </div>
    );
}
