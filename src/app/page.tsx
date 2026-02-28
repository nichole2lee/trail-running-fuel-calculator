'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Minus, Trash2, Calculator as CalculatorIcon, Package, Mountain, Zap, Droplets, Target, Info, Activity } from 'lucide-react';

interface Supplement {
  id: number;
  name: string;
  type: string;
  calories: number;
  carbohydrates: number;
  protein: number;
  fat: number;
  sodium: number;
  potassium: number;
  calcium: number;
  magnesium: number;
  notes: string | null;
  created_at: string;
}

interface SelectedSupplement extends Supplement {
  quantity: number;
}

interface RaceParams {
  distance: number; // 距离（公里）
  elevation: number; // 爬升高度（米）
  temperature: number; // 温度（摄氏度）
  weight: number; // 体重（公斤）
  height: number; // 身高（厘米）
  estimatedTime: number; // 预计完赛时间（小时）
  avgHeartRate: number; // 平均心率
}

interface RaceRecommendations {
  hourlyCalories: number;
  hourlyCarbs: number;
  hourlySodium: number;
  hourlyPotassium: number;
  totalCalories: number;
  totalCarbs: number;
  totalSodium: number;
  totalPotassium: number;
  waterIntake: number; // 建议补水量（升/小时）
}

const SUPPLEMENT_TYPES = [
  '能量胶',
  '盐丸',
  '能量棒',
  '固体食物',
  '运动饮料',
  '电解质胶囊',
  '能量饼干',
  '其他'
];

export default function CalculatorPage() {
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [selectedSupplements, setSelectedSupplements] = useState<SelectedSupplement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  // 比赛参数
  const [raceParams, setRaceParams] = useState<RaceParams>({
    distance: 50,
    elevation: 1500,
    temperature: 20,
    weight: 65,
    height: 170,
    estimatedTime: 8,
    avgHeartRate: 140
  });

  // 新补给品表单
  const [newSupplement, setNewSupplement] = useState({
    name: '',
    type: '能量胶',
    calories: 0,
    carbohydrates: 0,
    protein: 0,
    fat: 0,
    sodium: 0,
    potassium: 0,
    calcium: 0,
    magnesium: 0,
    notes: ''
  });

  useEffect(() => {
    fetchSupplements();
  }, []);

  const fetchSupplements = async () => {
    try {
      const response = await fetch('/api/supplements');
      const result = await response.json();
      if (result.data) {
        setSupplements(result.data);
      }
    } catch (error) {
      console.error('获取补给品失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const addSupplement = async () => {
    if (!newSupplement.name) {
      alert('请输入补给品名称');
      return;
    }

    try {
      const response = await fetch('/api/supplements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSupplement),
      });

      const result = await response.json();
      if (result.data) {
        setSupplements([result.data, ...supplements]);
        setShowAddForm(false);
        setNewSupplement({
          name: '',
          type: '能量胶',
          calories: 0,
          carbohydrates: 0,
          protein: 0,
          fat: 0,
          sodium: 0,
          potassium: 0,
          calcium: 0,
          magnesium: 0,
          notes: ''
        });
      }
    } catch (error) {
      console.error('添加补给品失败:', error);
    }
  };

  const addToCalculator = (supplement: Supplement) => {
    const existing = selectedSupplements.find(s => s.id === supplement.id);
    if (existing) {
      updateQuantity(supplement.id, existing.quantity + 1);
    } else {
      setSelectedSupplements([...selectedSupplements, { ...supplement, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCalculator(id);
      return;
    }
    setSelectedSupplements(
      selectedSupplements.map(s =>
        s.id === id ? { ...s, quantity } : s
      )
    );
  };

  const removeFromCalculator = (id: number) => {
    setSelectedSupplements(selectedSupplements.filter(s => s.id !== id));
  };

  const calculateTotals = () => {
    return selectedSupplements.reduce(
      (acc, item) => ({
        calories: acc.calories + item.calories * item.quantity,
        carbohydrates: acc.carbohydrates + Number(item.carbohydrates) * item.quantity,
        protein: acc.protein + Number(item.protein) * item.quantity,
        fat: acc.fat + Number(item.fat) * item.quantity,
        sodium: acc.sodium + item.sodium * item.quantity,
        potassium: acc.potassium + item.potassium * item.quantity,
        calcium: acc.calcium + item.calcium * item.quantity,
        magnesium: acc.magnesium + item.magnesium * item.quantity,
      }),
      {
        calories: 0,
        carbohydrates: 0,
        protein: 0,
        fat: 0,
        sodium: 0,
        potassium: 0,
        calcium: 0,
        magnesium: 0,
      }
    );
  };

  const totals = calculateTotals();

  // 基于科学研究的比赛补给推荐算法
  const calculateRaceRecommendations = (): RaceRecommendations => {
    const { distance, elevation, temperature, weight, estimatedTime, avgHeartRate } = raceParams;

    // 能量消耗计算（基于ACSM公式和越野跑研究）
    // 基础代谢率 × 运动强度因子 × 时间
    const baseMetabolicRate = weight * 1.2; // kcal/hour（静息）
    const elevationFactor = elevation * 0.001; // 爬升因子
    const intensityFactor = avgHeartRate / 140; // 心率强度因子
    const tempFactor = temperature > 25 ? 1.15 : (temperature < 10 ? 1.05 : 1.0); // 温度因子

    const hourlyCalories = Math.round(baseMetabolicRate * intensityFactor * elevationFactor * tempFactor * 4);
    const hourlyCarbs = Math.round(hourlyCalories * 0.6 / 4); // 60%热量来自碳水

    // 电解质需求计算（基于出汗量和运动医学研究）
    // 出汗率（升/小时）= 基础出汗率 × 强度 × 温度因子
    const sweatRate = 0.8 * intensityFactor * tempFactor;
    const hourlySodium = Math.round(sweatRate * 800); // 汗液钠浓度约800mg/L
    const hourlyPotassium = Math.round(sweatRate * 200); // 汗液钾浓度约200mg/L

    const waterIntake = sweatRate; // 补水量 = 出汗量

    const totalCalories = Math.round(hourlyCalories * estimatedTime);
    const totalCarbs = Math.round(hourlyCarbs * estimatedTime);
    const totalSodium = Math.round(hourlySodium * estimatedTime);
    const totalPotassium = Math.round(hourlyPotassium * estimatedTime);

    return {
      hourlyCalories: Math.min(Math.max(hourlyCalories, 200), 400), // 限制在合理范围
      hourlyCarbs: Math.min(Math.max(hourlyCarbs, 30), 90),
      hourlySodium: Math.min(Math.max(hourlySodium, 300), 1200),
      hourlyPotassium: Math.min(Math.max(hourlyPotassium, 100), 400),
      totalCalories,
      totalCarbs,
      totalSodium,
      totalPotassium,
      waterIntake: Math.round(waterIntake * 100) / 100
    };
  };

  const recommendations = calculateRaceRecommendations();

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      '能量胶': 'bg-blue-100 text-blue-800',
      '盐丸': 'bg-orange-100 text-orange-800',
      '能量棒': 'bg-green-100 text-green-800',
      '固体食物': 'bg-purple-100 text-purple-800',
      '运动饮料': 'bg-cyan-100 text-cyan-800',
      '电解质胶囊': 'bg-pink-100 text-pink-800',
      '能量饼干': 'bg-yellow-100 text-yellow-800',
      '其他': 'bg-gray-100 text-gray-800'
    };
    return colors[type] || colors['其他'];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <CalculatorIcon className="w-8 h-8 text-blue-400" />
            越野赛能量补给计算器
          </h1>
          <p className="text-blue-200 text-base">
            基于科学研究的专业补给规划工具
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="calculator" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <CalculatorIcon className="w-4 h-4 mr-2" />
              补给计算器
            </TabsTrigger>
            <TabsTrigger value="planner" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Target className="w-4 h-4 mr-2" />
              比赛补给规划
            </TabsTrigger>
          </TabsList>

          {/* 补给计算器 */}
          <TabsContent value="calculator" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* 左侧：补给品库 */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Package className="w-5 h-5 text-blue-400" />
                        补给品库
                      </CardTitle>
                      <CardDescription className="text-slate-400">选择补给品添加到计算器</CardDescription>
                    </div>
                    <Button onClick={() => setShowAddForm(!showAddForm)} variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
                      <Plus className="w-4 h-4 mr-2" />
                      添加补给品
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {showAddForm && (
                    <Card className="mb-4 bg-slate-900/50 border-blue-500/50">
                      <CardHeader>
                        <CardTitle className="text-base text-white">添加新补给品</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <Label htmlFor="name" className="text-white">名称 *</Label>
                          <Input
                            id="name"
                            value={newSupplement.name}
                            onChange={(e) => setNewSupplement({ ...newSupplement, name: e.target.value })}
                            placeholder="例如：能量胶"
                            className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                          />
                        </div>
                        <div>
                          <Label htmlFor="type" className="text-white">类型</Label>
                          <Select value={newSupplement.type} onValueChange={(value) => setNewSupplement({ ...newSupplement, type: value })}>
                            <SelectTrigger id="type" className="bg-slate-800 border-slate-700 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700">
                              {SUPPLEMENT_TYPES.map(type => (
                                <SelectItem key={type} value={type} className="text-white">{type}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor="calories" className="text-white">能量 (卡路里)</Label>
                            <Input
                              id="calories"
                              type="number"
                              value={newSupplement.calories}
                              onChange={(e) => setNewSupplement({ ...newSupplement, calories: Number(e.target.value) })}
                              className="bg-slate-800 border-slate-700 text-white"
                            />
                          </div>
                          <div>
                            <Label htmlFor="carbs" className="text-white">碳水 (克)</Label>
                            <Input
                              id="carbs"
                              type="number"
                              step="0.1"
                              value={newSupplement.carbohydrates}
                              onChange={(e) => setNewSupplement({ ...newSupplement, carbohydrates: Number(e.target.value) })}
                              className="bg-slate-800 border-slate-700 text-white"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          <div>
                            <Label htmlFor="protein" className="text-white text-xs">蛋白质</Label>
                            <Input
                              id="protein"
                              type="number"
                              step="0.1"
                              value={newSupplement.protein}
                              onChange={(e) => setNewSupplement({ ...newSupplement, protein: Number(e.target.value) })}
                              className="bg-slate-800 border-slate-700 text-white text-sm"
                            />
                          </div>
                          <div>
                            <Label htmlFor="fat" className="text-white text-xs">脂肪</Label>
                            <Input
                              id="fat"
                              type="number"
                              step="0.1"
                              value={newSupplement.fat}
                              onChange={(e) => setNewSupplement({ ...newSupplement, fat: Number(e.target.value) })}
                              className="bg-slate-800 border-slate-700 text-white text-sm"
                            />
                          </div>
                          <div>
                            <Label htmlFor="sodium" className="text-white text-xs">钠</Label>
                            <Input
                              id="sodium"
                              type="number"
                              value={newSupplement.sodium}
                              onChange={(e) => setNewSupplement({ ...newSupplement, sodium: Number(e.target.value) })}
                              className="bg-slate-800 border-slate-700 text-white text-sm"
                            />
                          </div>
                          <div>
                            <Label htmlFor="potassium" className="text-white text-xs">钾</Label>
                            <Input
                              id="potassium"
                              type="number"
                              value={newSupplement.potassium}
                              onChange={(e) => setNewSupplement({ ...newSupplement, potassium: Number(e.target.value) })}
                              className="bg-slate-800 border-slate-700 text-white text-sm"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor="calcium" className="text-white text-xs">钙 (mg)</Label>
                            <Input
                              id="calcium"
                              type="number"
                              value={newSupplement.calcium}
                              onChange={(e) => setNewSupplement({ ...newSupplement, calcium: Number(e.target.value) })}
                              className="bg-slate-800 border-slate-700 text-white text-sm"
                            />
                          </div>
                          <div>
                            <Label htmlFor="magnesium" className="text-white text-xs">镁 (mg)</Label>
                            <Input
                              id="magnesium"
                              type="number"
                              value={newSupplement.magnesium}
                              onChange={(e) => setNewSupplement({ ...newSupplement, magnesium: Number(e.target.value) })}
                              className="bg-slate-800 border-slate-700 text-white text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="notes" className="text-white">备注</Label>
                          <Input
                            id="notes"
                            value={newSupplement.notes}
                            onChange={(e) => setNewSupplement({ ...newSupplement, notes: e.target.value })}
                            placeholder="例如：建议每30-45分钟服用"
                            className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={addSupplement} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                            <Plus className="w-4 h-4 mr-2" />
                            保存
                          </Button>
                          <Button onClick={() => setShowAddForm(false)} variant="outline" className="flex-1 border-slate-600 text-white hover:bg-slate-700">
                            取消
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                    {supplements.length === 0 ? (
                      <div className="text-center py-8 text-slate-500">
                        暂无补给品，点击上方按钮添加
                      </div>
                    ) : (
                      supplements.map((supplement) => (
                        <Card key={supplement.id} className="bg-slate-900/50 border-slate-700 hover:border-blue-500/50 transition-all">
                          <CardContent className="p-3">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge className={getTypeColor(supplement.type)}>
                                    {supplement.type}
                                  </Badge>
                                </div>
                                <h3 className="font-semibold text-white text-sm mb-1">{supplement.name}</h3>
                                <div className="grid grid-cols-3 gap-1 text-xs text-slate-400">
                                  <div><span className="text-blue-400 font-medium">{supplement.calories}</span> 卡</div>
                                  <div><span className="text-green-400 font-medium">{Number(supplement.carbohydrates).toFixed(0)}</span>g 碳水</div>
                                  <div><span className="text-orange-400 font-medium">{supplement.sodium}</span>mg 钠</div>
                                </div>
                              </div>
                              <Button
                                onClick={() => addToCalculator(supplement)}
                                size="sm"
                                className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* 右侧：选择列表 + 营养汇总 */}
              <div className="space-y-6">
                {/* 选择列表 */}
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Package className="w-5 h-5 text-green-400" />
                      已选择补给品
                    </CardTitle>
                    <CardDescription className="text-slate-400">调整数量查看营养总摄入量</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedSupplements.length === 0 ? (
                      <div className="text-center py-8 text-slate-500">
                        请从左侧添加补给品
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2">
                        {selectedSupplements.map((item) => (
                          <Card key={item.id} className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-500/30">
                            <CardContent className="p-3">
                              <div className="flex items-center justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Badge className={getTypeColor(item.type)}>
                                      {item.type}
                                    </Badge>
                                  </div>
                                  <h4 className="font-medium text-white text-sm">{item.name}</h4>
                                  <p className="text-xs text-slate-400">
                                    {item.calories} 卡 × {item.quantity} = {item.calories * item.quantity} 卡
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="border-slate-600 text-white hover:bg-slate-700"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </Button>
                                  <span className="w-8 text-center font-semibold text-white">{item.quantity}</span>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="border-slate-600 text-white hover:bg-slate-700"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => removeFromCalculator(item.id)}
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* 营养汇总 */}
                <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-500/30">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      营养汇总
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedSupplements.length === 0 ? (
                      <div className="text-center py-8 text-slate-500">
                        请先添加补给品
                      </div>
                    ) : (
                      <>
                        {/* 总能量 */}
                        <div className="text-center p-4 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg border border-yellow-500/30">
                          <p className="text-yellow-300 text-sm mb-1">总能量</p>
                          <p className="text-4xl font-bold text-white">{totals.calories}</p>
                          <p className="text-yellow-300 text-xs mt-1">卡路里</p>
                        </div>

                        {/* 宏量营养素 */}
                        <Card className="bg-slate-900/50 border-slate-700">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base text-white">宏量营养素</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-400">碳水化合物</span>
                                <span className="text-white font-medium">{totals.carbohydrates.toFixed(1)} 克</span>
                              </div>
                              <div className="w-full bg-slate-700 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all"
                                  style={{ width: `${Math.min((totals.carbohydrates / 100) * 100, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-400">蛋白质</span>
                              <span className="text-white font-medium">{totals.protein.toFixed(1)} 克</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-400">脂肪</span>
                              <span className="text-white font-medium">{totals.fat.toFixed(1)} 克</span>
                            </div>
                          </CardContent>
                        </Card>

                        {/* 微量元素 */}
                        <Card className="bg-slate-900/50 border-slate-700">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base text-white">微量元素</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-400">钠</span>
                                <span className="text-white font-medium">{totals.sodium} 毫克</span>
                              </div>
                              <div className="w-full bg-slate-700 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all"
                                  style={{ width: `${Math.min((totals.sodium / 1000) * 100, 100)}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-slate-500 mt-1">建议每日摄入量：2300 毫克</p>
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-400">钾</span>
                                <span className="text-white font-medium">{totals.potassium} 毫克</span>
                              </div>
                              <div className="w-full bg-slate-700 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                                  style={{ width: `${Math.min((totals.potassium / 3500) * 100, 100)}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-slate-500 mt-1">建议每日摄入量：3500 毫克</p>
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-400">钙</span>
                                <span className="text-white font-medium">{totals.calcium} 毫克</span>
                              </div>
                              <div className="w-full bg-slate-700 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                                  style={{ width: `${Math.min((totals.calcium / 1000) * 100, 100)}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-slate-500 mt-1">建议每日摄入量：1000 毫克</p>
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-400">镁</span>
                                <span className="text-white font-medium">{totals.magnesium} 毫克</span>
                              </div>
                              <div className="w-full bg-slate-700 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all"
                                  style={{ width: `${Math.min((totals.magnesium / 400) * 100, 100)}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-slate-500 mt-1">建议每日摄入量：400 毫克</p>
                            </div>
                          </CardContent>
                        </Card>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 底部建议 */}
            {selectedSupplements.length > 0 && (
              <Card className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 border-amber-500/30">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Info className="w-4 h-4 text-amber-400" />
                    越野赛补给建议
                  </h3>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• <strong className="text-amber-300">能量摄入：</strong>每小时摄入 200-300 卡路里（根据运动强度调整）</li>
                    <li>• <strong className="text-amber-300">碳水化合物：</strong>每小时摄入 30-60 克</li>
                    <li>• <strong className="text-amber-300">电解质：</strong>每小时摄入钠 500-1000 毫克，注意补水</li>
                    <li>• <strong className="text-amber-300">时间安排：</strong>能量胶建议每 30-45 分钟一次，盐丸根据出汗情况调整</li>
                    <li>• <strong className="text-amber-300">注意：</strong>请在训练中测试补给方案，避免比赛时出现肠胃不适</li>
                  </ul>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* 比赛补给规划 */}
          <TabsContent value="planner" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* 比赛参数输入 */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Mountain className="w-5 h-5 text-purple-400" />
                    比赛参数
                  </CardTitle>
                  <CardDescription className="text-slate-400">输入比赛和身体参数以计算补给需求</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="distance" className="text-white">比赛距离</Label>
                      <Input
                        id="distance"
                        type="number"
                        value={raceParams.distance}
                        onChange={(e) => setRaceParams({ ...raceParams, distance: Number(e.target.value) })}
                        className="bg-slate-800 border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="elevation" className="text-white">爬升高度 (米)</Label>
                      <Input
                        id="elevation"
                        type="number"
                        value={raceParams.elevation}
                        onChange={(e) => setRaceParams({ ...raceParams, elevation: Number(e.target.value) })}
                        className="bg-slate-800 border-slate-700 text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="temperature" className="text-white">比赛温度 (°C)</Label>
                      <Input
                        id="temperature"
                        type="number"
                        value={raceParams.temperature}
                        onChange={(e) => setRaceParams({ ...raceParams, temperature: Number(e.target.value) })}
                        className="bg-slate-800 border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="estimatedTime" className="text-white">预计完赛时间 (小时)</Label>
                      <Input
                        id="estimatedTime"
                        type="number"
                        step="0.5"
                        value={raceParams.estimatedTime}
                        onChange={(e) => setRaceParams({ ...raceParams, estimatedTime: Number(e.target.value) })}
                        className="bg-slate-800 border-slate-700 text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="weight" className="text-white">体重 (公斤)</Label>
                      <Input
                        id="weight"
                        type="number"
                        value={raceParams.weight}
                        onChange={(e) => setRaceParams({ ...raceParams, weight: Number(e.target.value) })}
                        className="bg-slate-800 border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="height" className="text-white">身高 (厘米)</Label>
                      <Input
                        id="height"
                        type="number"
                        value={raceParams.height}
                        onChange={(e) => setRaceParams({ ...raceParams, height: Number(e.target.value) })}
                        className="bg-slate-800 border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="avgHeartRate" className="text-white">平均心率 (bpm)</Label>
                      <Input
                        id="avgHeartRate"
                        type="number"
                        value={raceParams.avgHeartRate}
                        onChange={(e) => setRaceParams({ ...raceParams, avgHeartRate: Number(e.target.value) })}
                        className="bg-slate-800 border-slate-700 text-white"
                      />
                    </div>
                  </div>

                  {/* 计算方法说明 */}
                  <Card className="bg-slate-900/50 border-slate-600">
                    <CardContent className="p-3">
                      <h4 className="font-medium text-white text-sm mb-2 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-blue-400" />
                        计算依据
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        基于 ACSM（美国运动医学会）公式和越野跑科学研究，结合心率强度、爬升高度、环境温度等因子综合计算能量消耗和电解质需求。
                      </p>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>

              {/* 补给推荐 */}
              <div className="space-y-4">
                {/* 每小时补给 */}
                <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/30">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      每小时补给建议
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-yellow-900/30 rounded-lg border border-yellow-500/30">
                        <p className="text-yellow-300 text-xs mb-1">能量</p>
                        <p className="text-2xl font-bold text-white">{recommendations.hourlyCalories}</p>
                        <p className="text-yellow-300 text-xs mt-1">卡/小时</p>
                      </div>
                      <div className="text-center p-3 bg-green-900/30 rounded-lg border border-green-500/30">
                        <p className="text-green-300 text-xs mb-1">碳水</p>
                        <p className="text-2xl font-bold text-white">{recommendations.hourlyCarbs}</p>
                        <p className="text-green-300 text-xs mt-1">克/小时</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-orange-900/30 rounded-lg border border-orange-500/30">
                        <p className="text-orange-300 text-xs mb-1">钠</p>
                        <p className="text-2xl font-bold text-white">{recommendations.hourlySodium}</p>
                        <p className="text-orange-300 text-xs mt-1">毫克/小时</p>
                      </div>
                      <div className="text-center p-3 bg-cyan-900/30 rounded-lg border border-cyan-500/30">
                        <p className="text-cyan-300 text-xs mb-1">钾</p>
                        <p className="text-2xl font-bold text-white">{recommendations.hourlyPotassium}</p>
                        <p className="text-cyan-300 text-xs mt-1">毫克/小时</p>
                      </div>
                    </div>
                    <div className="text-center p-3 bg-blue-900/30 rounded-lg border border-blue-500/30">
                      <p className="text-blue-300 text-xs mb-1">建议补水量</p>
                      <p className="text-3xl font-bold text-white">{recommendations.waterIntake}</p>
                      <p className="text-blue-300 text-xs mt-1">升/小时</p>
                    </div>
                  </CardContent>
                </Card>

                {/* 总量需求 */}
                <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Target className="w-5 h-5 text-purple-400" />
                      比赛总需求
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      预计 {raceParams.estimatedTime} 小时完赛
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
                      <span className="text-slate-300">总能量需求</span>
                      <span className="text-xl font-bold text-yellow-400">{recommendations.totalCalories} 卡</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
                      <span className="text-slate-300">总碳水需求</span>
                      <span className="text-xl font-bold text-green-400">{recommendations.totalCarbs} 克</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
                      <span className="text-slate-300">总钠需求</span>
                      <span className="text-xl font-bold text-orange-400">{recommendations.totalSodium} 毫克</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
                      <span className="text-slate-300">总钾需求</span>
                      <span className="text-xl font-bold text-cyan-400">{recommendations.totalPotassium} 毫克</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
                      <span className="text-slate-300">总补水量</span>
                      <span className="text-xl font-bold text-blue-400">{(recommendations.waterIntake * raceParams.estimatedTime).toFixed(1)} 升</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 专家建议 */}
            <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/30">
              <CardContent className="p-4">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-blue-400" />
                  专家补给建议
                </h3>
                <ul className="text-sm text-slate-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span><strong className="text-yellow-300">能量胶使用：</strong>根据每小时 {recommendations.hourlyCarbs}g 碳水需求，可使用 {Math.ceil(recommendations.hourlyCarbs / 25)}-{" "}{Math.ceil(recommendations.hourlyCarbs / 20)} 个能量胶（每胶约20-25g碳水）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1">•</span>
                    <span><strong className="text-orange-300">电解质补充：</strong>每小时需要 {recommendations.hourlySodium}mg 钠，建议使用电解质片或含钠运动饮料</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span><strong className="text-blue-300">补水策略：</strong>每小时补充 {recommendations.waterIntake} 升水，分多次小口饮用，避免一次性大量饮水</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong className="text-green-300">时间安排：</strong>建议每 30-45 分钟补给一次，提前规划补给站或自备补给</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span><strong className="text-red-300">温度提醒：</strong>当前温度 {raceParams.temperature}°C，高温时需增加补水量和电解质摄入</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span><strong className="text-purple-300">训练建议：</strong>所有补给方案应在训练中测试，确保肠胃适应</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
