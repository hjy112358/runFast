/**
 * 对战判断
 *  @param  {last} -- 上家出的牌
 *  @param  {lastype} -- 上家牌型
 *  @param  {yours} -- 本家出的牌
 *  @param  {yourtype} -- 牌型 cardKind
 * 	@return {true/false} --是否可以对上家的牌
 */

// 同类型  直接比较大小
// 不同类型   就只能王炸和炸弹

function follow(last, lastype, yours, yourtype) {
	var res = true;
	// 牌型一致
	if (lastype.cardKind == yourtype.cardKind) {
		res = compareGrade(lastype.val, yourtype.val);
		return res;
		// switch (yourtype.cardKind) {
		// 	// 单张
		// 	case 'ONE':
		// 		res = compareGrade(lastype.val, yourtype.val)
		// 		break;
		// 		// 对子
		// 	case 'TWO':
		// 		res = compareGrade(lastype.val, yourtype.val)
		// 		break;
		// 		// 三张
		// 	case 'THREE':
		// 		res = compareGrade(lastype.val, yourtype.val)
		// 		break;
		// 		// 三带一 
		// 	case 'THREE_ONE':
		// 		res = compareGrade(lastype.val, yourtype.val)
		// 		break;
		// 		// 炸弹
		// 	case 'BOMB':
		// 		res = compareGrade(lastype.val, yourtype.val)
		// 		break;
		// 		// 三带二
		// 	case 'THREE_TWO':
		// 		res = compareGrade(lastype.val, yourtype.val)
		// 		break;
		// 		// 顺子
		// 	case 'PROGRESSION':
		// 		res = compareGrade(lastype.val, yourtype.val)
		// 		break;
		// 		// 连对
		// 	case 'PROGRESSION_PAIRS':
		// 		res = compareGrade(lastype.val, yourtype.val)
		// 		break;
		// 		// 飞机
		// 	case 'PLANE':
		// 		res = compareGrade(lastype.val, yourtype.val)
		// 		break;
		// 		// 飞机带单
		// 	case 'PLANE_ONE':
		// 		res = compareGrade(lastype.val, yourtype.val)
		// 		break;
		// 		// 飞机带双
		// 	case 'PLANE_TWO':
		// 		res = compareGrade(lastype.val, yourtype.val)
		// 		break;
		// 		// 四带二
		// 	case 'FOUR_TWO':
		// 		res = compareGrade(lastype.val, yourtype.val)
		// 		break;
		// 		// 四带两个对子
		// 	case 'FOUR_PAIRS':
		// 		res = compareGrade(lastype.val, yourtype.val)
		// 		break;

		}else {
			// 牌型不一致  
			// 1.上家是王炸,对不上
			// 2.上家不是王炸,可以对上的就是王炸和炸弹
			// 集中判断是否王炸，免得多次判断王炸
			if (lastype.val == 'KINGBOMB') {
				// 上家王炸，肯定不能出
				return false;
			} else if (lastype.val == 'BOMB' ) {
				// 我王炸，肯定能出
				if(yourtype.val=='KINGBOMB'){
					return true
				}else if(yourtype.val=='BOMB'){
					res = compareGrade(lastype.val, yourtype.val);
					return res;
				}
				
			}
		}
	}

	




// 判断牌的大小
function compareGrade(last, your) {
	return last < your;
}
