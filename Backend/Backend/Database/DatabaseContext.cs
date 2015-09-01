#region (C) ML-Software.ch, Zollikofen, Switzerland 2015
//  Filename:  DatabaseContext.cs
//  Date: 26/08/2015
//  Author:  Matteo Locher
//  CONTENS:
//  DESCRIPTION: 
//  ----------------------------------------------------------------------------
//  Copyright (c) 2015. This software is subject to copyright protection under
//  the laws of Switzerland, European Union and other countries. This software is
//  the private properties of ML-Software.ch, Zollikofen, Switzerland and can not be
//  reproduced, distributed or given to a third party without the written consent
//  of ML-Software.ch.
#endregion

using System.Data.Entity;
using Backend.Models;

namespace Backend.Database
{
    public class DatabaseContext : DbContext
    {
        public DbSet<Project> Projects { get; set; }

        public DbSet<Task> Tasks { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<UserTask> UserTasks { get; set; }
    }
}