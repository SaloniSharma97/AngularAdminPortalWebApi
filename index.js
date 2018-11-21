var express =require('express');
var bodyparser=require('body-parser');
 var sql = require('mssql');

var project=express();
//body parser
project.use(bodyparser.json());

var cors = require('cors');


project.use(cors())
project.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


//Intialling connection string
var dbConfig={
    user:"sa",
    password:"123",
    server:"TRD-509",
    database:"BookStoreDB",
    options:{
        encrypt:false//Use this if you're on window Azure
    }
};

sql.connect(dbConfig,function(err){
    if(err){
        console.error(err)
    }else{
        console.log('Successfully Connected with Database!!');
    }
})


project.get('/Book',function(req,res){
    //create request object
    var request=new sql.Request();
    //query to the database and get the records
    request.query('select * from Book ',function(err,recordset){
        if(err){
            console.error(err);

        }else{
            res.send(recordset.recordset);
        }
    })
})

project.post('/Books',function(req,res){
    //create request object
    var request=new sql.Request();
    //query to the database and get the records
    request.query("INSERT INTO Book(BookTitle,Price,BookQuantity,CategoryId,SubCategoryId,SupplierId,Image) VALUES('"+req.body.BookTitle +"','"+req.body.Price+"','"+req.body.BookQuantity+"','"+req.body.CategoryId+"','"+req.body.SubCategoryId +"','"+req.body.SupplierId +"','"+req.body.Image +"')",function(err,recordset){
        if(err){console.log(err)
        }else{
            res.send('Record added successfully...')
            res.send(recordset.recordset);
            
        }
           
     });
})

project.delete('/Book/:id',function(req,res){
    //create request object
    var request=new sql.Request();
    var myquery='delete from Book where BookId= '+req.params.id;
    request.query(myquery,function(err,recordset){
        if(err){
            console.error(err);

        }else{
            res.send('Record Delete Successfully.....');
            res.send(recordset.recordset);
        }
    })
})

project.put('/book/:id',function(req,res){
    var request=new sql.Request();
    var myquerry="update Book set BookTitle='"+req.body.BookTitle+"',Price='"+req.body.Price+"',BookQuantity='"+req.body.BookQuantity+"',CategoryId='"+req.body.CategoryId+"',SubCategoryId='"+req.body.SubCategoryId+"',SupplierId='"+req.body.SupplierId+"',Image='"+req.body.Image+"'where BookId=" +req.params.id;
    request.query(myquerry,function(err,recordset){
        if(err){
            console.error(err);
        } else{
            res.send('Book updated successfully');
        }
    })
 })

//  project.get('/Book/:id',function(req,res){
//     //create request object
//     var request=new sql.Request();
//     //query to the database and get the records
//     request.query('select * from Book where BookId= '+req.params.id
//     ,function(err,recordset){
//         if(err){
//             console.error(err);

//         }else{
//             res.send(recordset.recordset);
            
//         }
//     })
// })


project.get('/BookByCategory/:id',function(req,res){
    //create request object
    var request=new sql.Request();
    //query to the database and get the records
var myquerry='select Book.BookTitle,Book.Price,Book.Image from [Book] join [Category] on Book.CategoryId = Category.CategoryId where Book.CategoryId='+req.params.id
    request.query(myquerry,function(err,recordset){
        if(err){
            console.error(err);

        }else{
        
            res.send(recordset.recordset);
        }
    })
})



project.get('/Book/:id',function(req,res){
    //create request object
    var request=new sql.Request();
    //query to the database and get the records
var myquerry='select Book.BookId,Book.BookTitle,Book.Price,Book.BookQuantity,Book.SupplierId,Book.Image,Category.CategoryTitle,SubCategory.SubCategoryTitle  from [Book] join [Category] on Book.CategoryId = Category.CategoryId join [SubCategory] on SubCategory.SubCategoryId = Book.SubCategoryId where Book.BookId='+req.params.id
    request.query(myquerry,function(err,recordset){
        if(err){
            console.error(err);

        }else{
        
            res.send(recordset.recordset);
        }
    })
})



//~~~~~~~~~~~~Category~~~~~~~~~~~~~~~~~~~~~~~~~


project.get('/Category',function(req,res){
    //create request object
    var request=new sql.Request();
    //query to the database and get the records
    request.query('select * from Category ',function(err,recordset){
        if(err){
            console.error(err);

        }else{
            res.send(recordset.recordset);
        }
    })
})


project.get('/category/:id',function(req,res){
    //create request object
    var request=new sql.Request();
    //query to the database and get the records
    request.query('select * from Category where CategoryId= '+req.params.id
    ,function(err,recordset){
        if(err){
            console.error(err);

        }else{
            res.send(recordset.recordset);
        }
    })
})

project.post('/Category1',function(req,res){
    //create request object
    var request=new sql.Request();
    //query to the database and get the records
    request.query("INSERT INTO [Category](CategoryTitle)VALUES('"+req.body.CategoryTitle +"')",function(err,recordset){
        if(err){console.log(err);
        }else{
            res.send('Categoy added successfully')
            res.send(recordset.recordset);

        }
     });
})

project.delete('/Category/:id',function(req,res){
    //create request object
    var request=new sql.Request();
    var myquery='delete from Category where CategoryId= '+req.params.id;
    request.query(myquery,function(err,recordset){
        if(err){
            console.error(err);

        }else{
            res.send('Record Delete Successfully.....');
            res.send(recordset.recordset);
        }
    })
})

project.put('/category/:id',function(req,res){
    var request=new sql.Request();
    var myquerry="update Category set  CategoryTitle='"+req.body.CategoryTitle+"'where CategoryId=" +req.params.id;
    request.query(myquerry,function(err,recordset){
        if(err){
            console.error(err);
        } else{
            res.send('Category updated successfully');
            res.send(recordset.recordset);
        }
    })
 })

//~~~~~~~~~~~~SubCategory~~~~~~~~~~~~~~~~~~~~~~~~~



project.get('/SubCategory',function(req,res){
    //create request object
    var request=new sql.Request();
    //query to the database and get the records
    request.query('select * from SubCategory ',function(err,recordset){
        if(err){
            console.error(err);

        }else{
            res.send(recordset.recordset);
        }
    })
})

// project.get('/subcategory/:id',function(req,res){
//     //create request object
//     var request=new sql.Request();
//     //query to the database and get the records
//     request.query('select * from SubCategory where SubCategoryId= '+req.params.id
//     ,function(err,recordset){
//         if(err){
//             console.error(err);

//         }else{
//             res.send(recordset.recordset);
//         }
//     })
// })

project.get('/subcategory/:id',function(req,res){
    //create request object
    var request=new sql.Request();
    //query to the database and get the records
    request.query('select SubCategory.SubCategoryId,SubCategory.SubCategoryTitle, Category.CategoryTitle from [SubCategory] join [Category] on SubCategory.CategoryId = Category.CategoryId where SubCategoryId= '+req.params.id
    ,function(err,recordset){
        if(err){
            console.error(err);

        }else{
            res.send(recordset.recordset);
        }
    })
})




project.post('/SubCategory1',function(req,res){
    //create request object
    var request=new sql.Request();
    //query to the database and get the records
    request.query("INSERT INTO [SubCategory](SubCategoryTitle,CategoryId)VALUES('"+req.body.SubCategoryTitle +"','"+req.body.CategoryId +"')",function(err,recordset){
        if(err){console.log(err);
        }else{
            res.send('SubCategoy added successfully')
            res.send(recordset.recordset);

        }
     });
})

project.delete('/SubCategory/:id',function(req,res){
    //create request object
    var request=new sql.Request();
    var myquery='delete from SubCategory where SubCategoryId= '+req.params.id;
    request.query(myquery,function(err,recordset){
        if(err){
            console.error(err);

        }else{
            res.send('Record Delete Successfully.....');
            res.send(recordset.recordset);
        }
    })
})

project.put('/subcategory/:id',function(req,res){
    var request=new sql.Request();
    var myquerry="update SubCategory set SubCategoryTitle='"+req.body.SubCategoryTitle+"',CategoryId='"+req.body.CategoryId+"'where SubCategoryId=" +req.params.id;
    request.query(myquerry,function(err,recordset){
        if(err){
            console.error(err);
        } else{
            res.send('SubCategory updated successfully');
        }
    })
 })

 project.get('/subcategory/:id',function(req,res){
    //create request object
    var request=new sql.Request();
    //query to the database and get the records
    request.query('select SubCategory.SubCategoryId,SubCategory.SubCategoryTitle,Category.CategoryTitle from [SubCategory] join [Category] on SubCategory.CategoryId = Category.CategoryId where SubCategoryId= '+req.params.id
    ,function(err,recordset){
        if(err){
            console.error(err);

        }else{
            res.send(recordset.recordset);
        }
    })
})



project.listen(3000,function(){
    console.log('Server is running at port 3000');
})


