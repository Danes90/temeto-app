import { Circle, Group, Layer, Line, Stage, Text } from 'react-konva';
import { useEffect, useRef, useState } from 'react';

/**
 * Temető-szintű térkép. A meglévő parcellákat kitöltött poligonként
 * (Konva.Line, closed) rajzolja ki. drawMode alatt a felhasználó
 * pontonként kattintva rajzol egy új parcella-poligont, Enter zárja le
 * (legalább 3 pont), Esc megszakítja.
 *
 * Ez a minta a feltöltött konva.html prototípus "járda" eszközének
 * (pontonkénti kattintás + előnézeti vonal) leegyszerűsített,
 * zárt-poligon változata.
 */
export default function CemeteryMapCanvas({ parcels, drawMode, onFinishDrawing, onSelectParcel }) {
    const wrapperRef = useRef(null);
    const [size, setSize] = useState({ width: 800, height: 600 });
    const [points, setPoints] = useState([]);
    const [mousePos, setMousePos] = useState(null);

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
        if (!drawMode) {
            setPoints([]);
        }
    }, [drawMode]);

    useEffect(() => {
        if (!drawMode) {
            return;
        }

        const handleKey = (e) => {
            if (e.key === 'Escape') {
                setPoints([]);
                return;
            }

            if (e.key === 'Enter') {
                setPoints((current) => {
                    if (current.length < 6) {
                        return current; // legalább 3 pont kell (x,y párok, tehát 6 szám)
                    }

                    onFinishDrawing(current);
                    return [];
                });
            }
        };

        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [drawMode, onFinishDrawing]);

    const handleStageClick = (e) => {
        if (!drawMode) {
            return;
        }

        const pos = e.target.getStage().getPointerPosition();
        setPoints((prev) => [...prev, pos.x, pos.y]);
    };

    const handleMouseMove = (e) => {
        if (!drawMode) {
            return;
        }

        setMousePos(e.target.getStage().getPointerPosition());
    };

    const previewPoints =
        drawMode && mousePos && points.length >= 2 ? [...points, mousePos.x, mousePos.y] : points;

    return (
        <div ref={wrapperRef} className="h-full w-full">
            <Stage
                width={size.width}
                height={size.height}
                onClick={handleStageClick}
                onMouseMove={handleMouseMove}
                className={drawMode ? 'cursor-crosshair' : 'cursor-default'}
            >
                <Layer>
                    {parcels.map((parcel) => {
                        const flatPoints = parcel.points.flatMap((p) => [p.x, p.y]);
                        const centroid = parcel.points.reduce(
                            (acc, p) => ({
                                x: acc.x + p.x / parcel.points.length,
                                y: acc.y + p.y / parcel.points.length,
                            }),
                            { x: 0, y: 0 }
                        );

                        return (
                            <Group key={parcel.id} onClick={() => !drawMode && onSelectParcel(parcel)}>
                                <Line
                                    points={flatPoints}
                                    closed
                                    fill={parcel.color || 'rgba(76, 175, 80, 0.35)'}
                                    stroke="#2e7d32"
                                    strokeWidth={2}
                                />
                                <Text
                                    text={`${parcel.name}\n(${parcel.graves_count ?? 0} sír)`}
                                    x={centroid.x - 40}
                                    y={centroid.y - 10}
                                    width={80}
                                    align="center"
                                    fontSize={13}
                                    fill="#1b1b1b"
                                    listening={false}
                                />
                            </Group>
                        );
                    })}

                    {drawMode && points.length >= 2 && (
                        <Line
                            points={previewPoints}
                            closed={points.length >= 6}
                            stroke="#1976d2"
                            strokeWidth={2}
                            dash={[6, 4]}
                            fill="rgba(25, 118, 210, 0.15)"
                        />
                    )}

                    {drawMode &&
                        Array.from({ length: points.length / 2 }).map((_, i) => (
                            <Circle key={i} x={points[i * 2]} y={points[i * 2 + 1]} radius={4} fill="#1976d2" />
                        ))}
                </Layer>
            </Stage>
        </div>
    );
}
