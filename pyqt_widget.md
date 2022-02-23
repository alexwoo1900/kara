## Qt Widget

### 控件

#### 对话框

```python
# init & get path
path, _ = QFileDialog.getOpenFileName(parent, "load", "", "image (*.jpg *.png)")    # optional: getSaveFileName
```

#### 文本框

```python
# init
text_edit = QTextEdit()
text_edit.currentCharFormatChanged.connect(apply_new_char_format)
text_edit.cursorPositionChanged.connect(apply_new_block_format_show)
```

```python
# apply alignment
text_edit.setAlignment(Qt.AlignLeft | Qt.AlignAbsolute)                             # optional: AlignRight, AlignHCenter, AlignJustify
```

```python
# apply char format
fmt = QTextCharFormat()
fmt.setFontFamily(f)                                                                # optional: setFontPointSize, setForeground, setFontWeight, setFontItalic, setFontUnderline, setProperty
cursor = text_edit.textCursor()
if not cursor.hasSelection():
    cursor.select(QTextCursor.WordUnderCursor)
cursor.mergeCharFormat(fmt)
text_edit.mergeCurrentCharFormat(fmt)
```

```python
# apply block format
cursor = text_edit.textCursor()
cursor.beginEditBlock()
block_fmt = cursor.blockFormat()
block_fmt.setHeadingLevel(heading_level)                                            # optional: setMarker
cursor.setBlockFormat(block_fmt)
cursor.endEditBlock()
```

```python
# text to image
doc = text_editor.document()
image = QImage(doc.idealWidth(), doc.size().height(), QImage.Format_ARGB32)
image.fill(QColor(255, 255, 255, 0))
painter = QPainter(image)
doc.drawContents(painter, QRectF(0, 0, doc.idealWidth(),  doc.size().height()))
painter.end()
```

#### 下拉框

```python
# init
cb = QComboBox(parent)
cb.setMaximumWidth(w)
cb.setEditable(False)
```

```python
# add item
cb.addItem("item1")
```

#### 列表

```python
# init
list = QListWidget()
```

```python
# add item
item = QListWidgetItem()
widget = QWidget()
list.addItem(item)
list.setItemWidget(item, widget)
```

```python
# remove item
list.takeItem(list.row(item))
del item
```

#### 表格

```python
# init
table = QTableWidget()
table.setRowCount(r)
table.setColumnCount(c)
table.setRowHeight(r_idx, h)
table.setColumnWidth(c_idx, w)
table.setShowGrid(True)
table.setFrameShape(QFrame.NoFrame)
table.horizontalHeader().setVisible(False)
table.verticalHeader().setVisible(False)
table.horizontalHeader().setStretchLastSection(True)
table.setSelectionBehavior(QAbstractItemView.SelectRows)
table.setEditTriggers(QAstractItemView.DoubleClicked)
```

```python
# add cell(not row)
table.setCellWidget(r_idx, c_idx, widget)
```

#### 图像视图

```python
# init
view = QGraphicsView()
scene = QGraphicsScene()
view.setScene(scene)
view.setSceneRect(rect)

'''
setSceneRect中的x、y参数代表着view origin相对于scene origin的偏移
boundingRect中的x、y参数代表着view origin相对于display top left的偏移

EX1:
scene.setSceneRect(0, 0, w, h)                 scene.setSceneRect(-100, -100, w, h)                       scene.setSceneRect(-100, -100, w, h)
item.boundingRect() == (150, 150, w, h)        item.boundingRect() == (150, 150, w, h)                    item.boundingRect() == (0, 0, w, h)

display top left, (-150, -150) in view coord   display top-left, (-150, -150) in view coord               display top-left & view origin
    +---------------------->                      +------------------------>                                  +------------------------>
    |   view & scene origin                       |                                                           | scene origin
    |       |                                     |                                                           |       |
    |       v                                     |   view origin                                             |       v
    |       ****                                  |       +---------------->                                  |       ****
    |       **** (item)                           |       |    scene origin, (100, 100) in view coord         |       **** (item)
    |                                             |       |         |                                         |
    |                                             |       |         v                                         |
    |                                             |       |         ****                                      |
    v                                             v       v         **** (item)                               v

EX2:
scene & view unset scene rect
item.boundingRect() == (100, 100, w, h)
item2.boundingRect() == (400, 400, w, h)

display top left, scene origin, (-100, -100) in view coord
    +---------------------->
    |   view origin
    |      |
    |      v
    |      +--------------+
    |      |******        |
    |      |******        |
    |      |******        | <---------scene rect == largest bounding rect of all items
    |      |        ******|
    |      |        ******|
    |      |        ******|
    |      +--------------+
    v

EX3:
scene.setSceneRect(100, 100, w, h)
view.setSceneRect(0, 0, w, h)
scene rect overrided by view's setting
'''
```

#### 工具栏

```python
# init
tb = QToolBar("Tool bar")
```

```python
# add action
action = QAction(icon, "", parent)
tb.addAction(action)
```

```python
# add actions
group = QActionGroup(parent)
group.addAction(action1)
group.addAction(action2)
group.addAction(action3)
tb.addActions(group.actions())
```

#### 字体下拉框

```python
cb = QFontComboBox(parent)
cb.setMaximumWidth(w)
cb.setEditable(False)
cb.textActivated.connect(change_family)
```

#### 字号下拉框

```python
cb = QComboBox(parent)
cb.addItems([size for size in QFontDatabase.standardSizes()])
cb.setCurrentIndex(QFontDatabase.standardSizes().index(QApplication.font().pointSize()))
cb.setMaximumWidth(w)
cb.setEditable(False)
cb.textActivated.connect(change_size)
```

#### 颜色对话框

```python
color = QColorDialog.getColor(init_color, parent)
```

#### 消息弹窗

```python
QMessageBox.information(parent, "Info", "")                                         # optional: question, warning, critical
```

#### 快捷键

```python
QShortcut(QKeySequence.Delete, parent, activated=do_delete)                         # optional: StandardKey
```

### 布局

#### 尺寸

```text
                   widget
                      |
                      v
                 有无layout
                      |
        +--有---------+---------无--+
        |                           |
        v                           v
    最终尺寸参考                 最终尺寸参考
layout的sizePolicy         widget默认的sizePolicy

+------------------------------+-----------------------------------------------------------------------------+
|       QSizePolicy.Fixed      |                       只使用sizeHint提供的值，无伸缩                         |
+------------------------------+-----------------------------------------------------------------------------+
|      QSizePolicy.Minimum     |                     将sizeHint提供的值视为最小值，可拉伸                     |
+------------------------------+-----------------------------------------------------------------------------+
|      QSizePolicy.Maximum     |                     将sizeHint提供的值视为最大值，可压缩                     |
+------------------------------+-----------------------------------------------------------------------------+
|     QSizePolicy.Preferred    |                     将sizeHint提供的值视为最佳值，可伸缩                     |
+------------------------------+-----------------------------------------------------------------------------+
|     QSizePolicy.Expanding    |  将sizeHint提供的值视为合适值，可被压缩，更倾向于拉伸（与Preferred同时存在时）|
+------------------------------+-----------------------------------------------------------------------------+
| QSizePolicy.MinimumExpanding |                   将sizeHint提供的值视为最小值，倾向于拉伸                   |
+------------------------------+-----------------------------------------------------------------------------+
|       QSizePolicy.Ignored    |                       忽略sizeHint提供的值，倾向于拉伸                       |
+------------------------------+-----------------------------------------------------------------------------+
```

#### 空间比例

以sizePolicy是Preferred的QTextEdit作为widget为例：

```python
child_layout1 = QVBoxLayout()
child_layout1.addWidget(widget1)
child_layout1.addWidget(widget2)
child_layout1.setStretchFactor(widget1, 3)
child_layout1.setStretchFactor(widget2, 1)

child_layout2 = QVBoxLayout()
child_layout2.addWidget(widget3)
child_layout2.addWidget(widget4)

parent_layout = QHBoxLayout()
parent_layout.addLayout(child_layout1)
parent_layout.addLayout(child_layout2)
parent_layout.setStretchFactor(child_layout1, 2)
parent_layout.setStretchFactor(child_layout2, 1)
parent_widget.setLayout(parent_layout)

'''
                            Expanded
                               |
        parent layout          |
        +----------------------|-----------+ +---------------+ 
-       |+---------------------|----------+| |+-------------+|
^       ||+--------------------|---------+|| ||+-----------+||
|       |||                    |         ||| |||           |||
|       |||                    |         ||| |||     3     ||| 
3       |||              1     v         ||| |||           ||| 
|       |||                              ||| ||+-----------+||
|       |||                              ||| |+-------------+| 
v       ||+------------------------------+|| |+-------------+| 
-       |+--------------------------------+| ||+-----------+||
-       |+--------------------------------+| |||           |||
^       ||+------------------------------+|| |||     4     |||
1       |||              2               ||| |||           |||
v       ||+------------------------------+|| ||+-----------+|| 
-       |+--------------------------------+| |+-------------+| 
        +----------------------------------+ +---------------+ 

        |<---------------2---------------->| |<------1------>|
'''
```

#### 对齐

```python
child_layout1.addWidget(child_widget1, alignment=Qt.AlignCenter)

'''
            Align center, noexpand
                       |
parent layout          |
+----------------------|-----------+ +---------------+ 
|child layout          |           | |+-------------+|
|+---------------------|----------+| ||+-----------+||
||   child widget      |          || |||           |||
||      +--------------|---+      || |||     3     ||| 
||      |              v   |      || |||           ||| 
||      |        1         |      || ||+-----------+||
||      |                  |      || |+-------------+| 
||      +------------------+      || |+-------------+| 
|+--------------------------------+| ||+-----------+||
|+--------------------------------+| |||           |||
||+------------------------------+|| |||     4     |||
|||              2               ||| |||           |||
||+------------------------------+|| ||+-----------+|| 
|+--------------------------------+| |+-------------+| 
+----------------------------------+ +---------------+ 
'''
```


#### 间距

```python
child_layout2.addWidget(child_widget3)
child_layout2.addSpacing(40)
child_layout2.addWidget(child_widget4)

'''
parent layout          
+----------------------------------+ +---------------+
|child layout                      | |+-------------+|
|+--------------------------------+| ||+-----------+||
||   child widget                 || |||     3     |||
||      +------------------+      || ||+-----------+||
||      |                  |      || |+-------------+|
||      |        1         |      || |               |
||      |                  |      || |    spacing    |
||      +------------------+      || |     added     |
|+--------------------------------+| |               |
|+--------------------------------+| |+-------------+|
||+------------------------------+|| ||+-----------+||
|||              2               ||| |||     4     |||
||+------------------------------+|| ||+-----------+||
|+--------------------------------+| |+-------------+|
+----------------------------------+ +---------------+
'''
```

```python
child_layout2.addWidget(child_widget3)
child_layout2.addWidget(child_widget4)
child_layout2.addWidget(child_widget5)
child_layout2.setSpacing(10)

'''        
+---------------+
|+-------------+|
||+-----------+||
|||     3     |||
||+-----------+||
|+-------------+|
|    spacing    |
|+-------------+|
||+-----------+||
|||     4     |||
||+-----------+||
|+-------------+|
|    spacing    |
|+-------------+|
||+-----------+||
|||     5     |||
||+-----------+||
|+-------------+|
+---------------+
'''
```

### 画笔

```python
# init
painter = QPainter(device)
```

```python
# use pen(defines how to draw lines and outlines, also defines the text color)
pen = QPen(Qt.black, 1, Qt.SolidLine, Qt.RoundCap, Qt.RoundJoin)                    # optional: pen.setStyle, pen.setWidth, pen.setCapStyle, pen.setJoinStyle
painter.setPen(pen)
```

```python
# use brush(defines how shapes are filled)
brush = QBrush(gradient)                                                            # optional: brush.setColor, brush.setTexture, brush.setStyle
painter.setBrush(brush)
```

```python
# draw image
painter.drawImage(rect, image)                                                      # optional: drawPixmap
# draw text
painter.drawText(point, text)                                                       # optional: drawText(x1, y1, text), drawStaticText
# draw point
painter.drawPoint(point)                                                            # optional: drawPoint(x1, y1), drawPoints
# draw line
painter.drawLine(line)                                                              # optional: drawLine(x1, y1, x2, y2), drawLines
# draw rectangle
painter.drawRect(rect)                                                              # optional: drawRect(x1, y1, x2, y2), drawRects
# draw ellipse
painter.drawEllipse(rect)                                                           # optional: drawEllipse(x1, y1, x2, y2)
```

```python
# draw path
path = QPainterPath()
path.moveTo(p0.x, p0.y)
path.lineTo(p1.x, p1.y)                                                             # optional: cubicTo(c1.x, c1.y, c2.x, c2.y, p1.x, p1.y)
path.lineTo(p2.x, p2.y)
path.lineTo(p0.x, p0.y)
painter.drawPath(path)                                                              # optional: fillPath(path, QColor)
```

### 图像

```python
# init QImage
image1 = QImage(path)                                                               # optional: QImage(w, h, format)
```

```python
# init QPixmap
image2 = QPixmap()                                                                  # optional: QPixmap(w, h), QPixmap.fromImage(image1)
```

```python
# color to gray
image = QImage(path)
gray_image = image.convertToFormat(QImage.Format_Grayscale8, Qt.AutoColor)
```

```python
# color to gray(through OpenCV)
matrix = qimage2ndarray.rgb_view(image)
gray_matrix = cv.cvtColor(matrix, cv.COLOR_RGB2GRAY)
gray_image = QImage(gray_matrix.data, gray_matrix.shape[1], gray_matrix.shape[0], QImage.Format_Grayscale8)
```

```python
# color to binary(through OpenCV)
_, binary_matrix = cv.threshold(matrix, threshold_value, 255, cv.THRESH_BINARY)
binary_image = QImage(binary_matrix.data, binary_matrix.shape[1], binary_matrix.shape[0], QImage.Format_Grayscale8)
```

```python
# binary to contours(through OpenCV)
contours, _ = cv.findContours(binary_matrix, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE)ywy
cv.drawContours(matrix, contours, -1, 0, w)
contours_image = QImage(matrix.data, matrix.shape[1], matrix.shape[0], QImage.Format_Grayscale8)
```

### 非控件

#### 复制与粘贴

```python
datatype = "application/customdata"

def copy():
    mimedata = QMimeData()
    write_target = QByteArray()                                                     # optional: QFile
    datastream = QDataStream(write_target, QIODevice.WriteOnly)
    datastream.writeInt(1)                                                          # optional: writeFloat, writeQString
    image = QPixmap()                                                               # optional: almost all Qt Object
    datastream << image
    mimedata.setData(datatype, write_target)
    clipboard = QGuiApplication.clipboard()
    clipboard.setMimeData(mimedata)

def paste():
    clipboard = QGuiApplication.clipboard()
    mimedata = clipboard.mimeData()
    if mimedata.hasFormat(datatype):
        write_target = mimedata.data(datatype)
        datastream = QDataStream(write_target)
        while not datastream.atEnd():
            data1 = datastream.readInt()                                            # optional: readFloat, readQString
            data2 = QPixmap()
            datastream >> data2
```