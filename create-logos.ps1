Add-Type -AssemblyName System.Drawing

$desktop = [Environment]::GetFolderPath("Desktop")

function FillRoundedRect {
    param($g, $brush, $x, $y, $w, $h, $r)
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.AddArc($x, $y, $r*2, $r*2, 180, 90)
    $path.AddArc($x+$w-$r*2, $y, $r*2, $r*2, 270, 90)
    $path.AddArc($x+$w-$r*2, $y+$h-$r*2, $r*2, $r*2, 0, 90)
    $path.AddArc($x, $y+$h-$r*2, $r*2, $r*2, 90, 90)
    $path.CloseFigure()
    $g.FillPath($brush, $path)
    $path.Dispose()
}

$purple = [System.Drawing.Color]::FromArgb(124,58,237)
$cyan_c = [System.Drawing.Color]::FromArgb(6,182,212)
$dark = [System.Drawing.Color]::FromArgb(15,23,42)
$pink_c = [System.Drawing.Color]::FromArgb(244,114,182)
$cyan2 = [System.Drawing.Color]::FromArgb(56,189,248)
$yellow_c = [System.Drawing.Color]::FromArgb(251,191,36)
$green_c = [System.Drawing.Color]::FromArgb(52,211,153)
$violet_c = [System.Drawing.Color]::FromArgb(139,92,246)
$slate = [System.Drawing.Color]::FromArgb(148,163,184)

$leftOffset = -7

# ========== PROFILE PICTURE 512x512 ==========
$bmp = New-Object System.Drawing.Bitmap(512, 512)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

$pt1 = New-Object System.Drawing.Point(0,0)
$pt2 = New-Object System.Drawing.Point(512,512)
$bg = New-Object System.Drawing.Drawing2D.LinearGradientBrush($pt1,$pt2,$purple,$cyan_c)
FillRoundedRect $g $bg 0 0 512 512 100

$db = New-Object System.Drawing.SolidBrush($dark)
FillRoundedRect $g $db 127 135 240 100 50

$dpadBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(51,65,85))
$g.FillRectangle($dpadBrush, 161, 170, 30, 10)
$g.FillRectangle($dpadBrush, 171, 160, 10, 30)

$g.FillEllipse((New-Object System.Drawing.SolidBrush($pink_c)), 296, 155, 28, 28)
$g.FillEllipse((New-Object System.Drawing.SolidBrush($cyan2)), 319, 178, 28, 28)
$g.FillEllipse((New-Object System.Drawing.SolidBrush($yellow_c)), 296, 201, 28, 28)
$g.FillEllipse((New-Object System.Drawing.SolidBrush($green_c)), 273, 178, 28, 28)
$g.FillEllipse((New-Object System.Drawing.SolidBrush($violet_c)), 235, 175, 24, 24)

$f1 = New-Object System.Drawing.Font("Arial", 80, [System.Drawing.FontStyle]::Bold)
$sz = $g.MeasureString("PlayKrux", $f1)
$x1 = [Math]::Round((512 - $sz.Width) / 2 + $leftOffset)
$y1 = 240
$playW = $g.MeasureString("Play", $f1).Width
$g.DrawString("Play", $f1, [System.Drawing.Brushes]::White, [float]$x1, [float]$y1)
$g.DrawString("Krux", $f1, (New-Object System.Drawing.SolidBrush($cyan2)), [float]($x1 + $playW - 14), [float]$y1)

$g.Dispose()
$bmp.Save("$desktop\playkrux-logo-512.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Host "OK: playkrux-logo-512.png"

# ========== BANNER 2048x1152 ==========
$bmp2 = New-Object System.Drawing.Bitmap(2048, 1152)
$g2 = [System.Drawing.Graphics]::FromImage($bmp2)
$g2.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g2.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

$pt3 = New-Object System.Drawing.Point(0,0)
$pt4 = New-Object System.Drawing.Point(2048,1152)
$bg2 = New-Object System.Drawing.Drawing2D.LinearGradientBrush($pt3,$pt4,[System.Drawing.Color]::FromArgb(10,10,26),[System.Drawing.Color]::FromArgb(10,26,46))
$g2.FillRectangle($bg2, 0, 0, 2048, 1152)

$g2.FillEllipse((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(12,$purple))), -100, -100, 600, 600)
$g2.FillEllipse((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(12,$cyan_c))), 1550, 650, 600, 600)

$titleFont = New-Object System.Drawing.Font("Arial", 120, [System.Drawing.FontStyle]::Bold)
$tsz = $g2.MeasureString("PlayKrux", $titleFont)
$tx = [Math]::Round((2048 - $tsz.Width) / 2 + $leftOffset)
$tpw = $g2.MeasureString("Play", $titleFont).Width
$g2.DrawString("Play", $titleFont, [System.Drawing.Brushes]::White, [float]$tx, 413.0)
$g2.DrawString("Krux", $titleFont, (New-Object System.Drawing.SolidBrush($cyan2)), [float]($tx + $tpw - 14), 413.0)

$tagFont = New-Object System.Drawing.Font("Arial", 40, [System.Drawing.FontStyle]::Regular)
$tagBrush = New-Object System.Drawing.SolidBrush($slate)
$tsz2 = $g2.MeasureString("FREE ONLINE GAMES", $tagFont)
$g2.DrawString("FREE ONLINE GAMES", $tagFont, $tagBrush, [float][Math]::Round((2048 - $tsz2.Width) / 2 + $leftOffset), 611.0)

$lineW = [Math]::Round($tsz.Width - 20)
$lineX = [float]($tx + 10)
$pt5 = New-Object System.Drawing.Point(0,0)
$pt6 = New-Object System.Drawing.Point($lineW,0)
$accentBar = New-Object System.Drawing.Drawing2D.LinearGradientBrush($pt5,$pt6,$purple,$cyan_c)
$g2.FillRectangle($accentBar, $lineX, 681.0, [float]$lineW, 3.0)

$urlFont = New-Object System.Drawing.Font("Arial", 28, [System.Drawing.FontStyle]::Regular)
$urlBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(100,116,139))
$usz = $g2.MeasureString("playkrux.com", $urlFont)
$g2.DrawString("playkrux.com", $urlFont, $urlBrush, [float][Math]::Round((2048 - $usz.Width) / 2 + $leftOffset), 696.0)

$g2.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(76,$purple))), 0, 1110, 2048, 42)

$g2.Dispose()
$bmp2.Save("$desktop\playkrux-banner-2048x1152.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp2.Dispose()
Write-Host "OK: playkrux-banner-2048x1152.png"

Write-Host "ALL DONE!"
